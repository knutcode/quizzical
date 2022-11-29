function useStylizeAnswers(gameOver, isCorrect, correctAnswer) {
	function stylize(answer) {
		if (gameOver && answer.isPicked && isCorrect) {
			return {
				background: '#94D7A2',
				border: '2px solid #94D7A2',
				color: 'inherit',
			};
		} else if (gameOver && answer.isPicked && !isCorrect) {
			return {
				background: '#F8BCBC',
				border: '2px solid #F8BCBC',
				textDecoration: 'line-through',
			};
		} else if (answer.isPicked && !gameOver) {
			return {
				background: '#D6DBF5',
				border: '2px solid #848fc3',
			};
		} else if (gameOver && answer.answer === correctAnswer) {
			return {
				background: '#b0e1ba',
				border: '2px solid #b0e1ba',
			};
		} else if (!answer.isPicked && !gameOver) {
			return {
				background: 'none',
				border: '2px solid #4D5B9E',
			};
		}
	}

	return { stylize };
}

export default useStylizeAnswers;
