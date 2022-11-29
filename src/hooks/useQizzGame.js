import { useState } from 'react';

function useQuizzGame() {
	const [points, setPoints] = useState(0);
	const [gameState, setGameState] = useState({
		isActive: false,
		isOver: false,
	});
	const [category, setCategory] = useState({ value: '', topic: '' });

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

	return { gameState, category, changeCategory, setGameState, points, setPoints, countPoints };
}

export default useQuizzGame;
