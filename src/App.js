import axios from 'axios';
import { useState } from 'react';
import { decode } from 'html-entities';
import { QuizzCard } from './components/QuizzCard';
import { nanoid } from 'nanoid';
import { StartScreen } from './components/StartScreen';
import { SVGYellow } from './components/SVGYellow';
import { SVGBlue } from './components/SVGBlue';

function App() {
	const [quizzData, setQuizzData] = useState();
	const [points, setPoints] = useState(0);
	const [gameState, setGameState] = useState({
		isActive: false,
		isOver: false,
	});
	const [category, setCategory] = useState({ value: '', topic: '' });

	const fetchData = () => {
		setPoints(0);
		setGameState((prevState) => {
			return { ...prevState, isOver: false };
		});
		setQuizzData();
		axios
			.get(`https://opentdb.com/api.php?amount=5&type=multiple&category=${category.value}`)
			.then((res) => {
				return res.data.results;
			})
			.then((results) =>
				setQuizzData(
					results.map((item) => {
						return {
							id: nanoid(),
							question: decode(item.question),
							correctAnswer: item.correct_answer,
							answers: [...item.incorrect_answers, item.correct_answer]
								.map((value) => ({ value, sort: Math.random() }))
								.sort((a, b) => a.sort - b.sort)
								.map(({ value }) => value),
						};
					})
				)
			)
			.then(
				setGameState((prevState) => {
					return { ...prevState, isActive: true };
				})
			);
	};

	const countPoints = () => {
		setPoints((prevState) => {
			return prevState + 1;
		});
	};

	const changeCategory = (event) => {
		setCategory((prevCategory) => {
			return {
				...prevCategory,
				value: event.target.value,
			};
		});
	};

	return (
		<>
			{!gameState.isActive && (
				<StartScreen
					fetchData={fetchData}
					category={category}
					changeCategory={changeCategory}
				/>
			)}
			{quizzData && gameState.isActive && (
				<QuizzCard
					questions={quizzData}
					gameState={gameState}
					setGameState={setGameState}
					points={points}
					countPoints={countPoints}
					restart={fetchData}
				/>
			)}
			{!quizzData && gameState.isActive && <h2>Loading ...</h2>}
			<SVGYellow />
			<SVGBlue />
		</>
	);
}

export default App;
