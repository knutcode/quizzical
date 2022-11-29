import { useState } from 'react';
import { decode } from 'html-entities';
import { nanoid } from 'nanoid';
import axios from 'axios';

function useQuizzData(setPoints, setGameState, category) {
	const [quizzData, setQuizzData] = useState();

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

	return { quizzData, fetchData };
}

export default useQuizzData;
