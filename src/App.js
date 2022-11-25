import axios from 'axios';
import { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import { QuizzCard } from './components/QuizzCard';
import { nanoid } from 'nanoid';

function App() {
	const [points, setPoints] = useState(0);
	const [gameState, setGameState] = useState({
		isActive: false,
		isOver: false,
	});

	const [quizzData, setQuizzData] = useState();

	const fetchData = () => {
		setPoints(0);
		setGameState((prevState) => {
			return { ...prevState, isOver: false };
		});
		setQuizzData();
		axios
			.get('https://opentdb.com/api.php?amount=5&type=multiple')
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

	return (
		<>
			{!gameState.isActive && (
				<div>
					<h1>Quizzical</h1>
					<button
						onClick={() => {
							fetchData();
						}}
					>
						Start quiz
					</button>
				</div>
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
		</>
	);
}

export default App;
