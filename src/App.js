import axios from 'axios';
import { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import { QuizzCard } from './components/quizzCard/quizzCard';

function App() {
	const [quizzData, setQuizzData] = useState();

	const fetchData = () => {
		axios
			.get('https://opentdb.com/api.php?amount=5&type=multiple')
			.then((res) => {
				return res.data.results;
			})
			.then((results) => setQuizzData(results));
	};

	useEffect(() => {
		if (quizzData) {
			quizzData.forEach((item) => {
				console.log(item.question);
			});
		} else return;
	}, [quizzData]);

	const renderCards = () => {
		const quizzCardRender = quizzData.map((item, i) => {
			const answers = [...item.incorrect_answers, item.correct_answer]
				.map((value) => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value);
			// sorting method -> https://en.wikipedia.org/wiki/Schwartzian_transform

			return (
				<QuizzCard
					key={i}
					id={i}
					question={decode(item.question)}
					correctAnswer={item.correct_answer}
					answers={answers}
					isClicked={false}
				/>
			);
		});
		return quizzCardRender;
	};

	return (
		<>
			<h1>Quizzical</h1>
			<button
				onClick={() => {
					fetchData();
				}}
			>
				Start quiz
			</button>
			{quizzData ? renderCards() : <h2>waiting for data</h2>}
		</>
	);
}

export default App;
