import React, { useState } from 'react';
import { decode } from 'html-entities';
import { nanoid } from 'nanoid';
import { AnswerBtn } from './styles';

export const Answers = (props) => {
	const answers = props.answers.map((answer) => {
		return {
			id: nanoid(),
			answer: answer,
			isPicked: false,
		};
	});

	const [answerState, setAnswerState] = useState(answers);

	function toggle(idAnswer, idQuestion, answer) {
		setAnswerState((answers) => {
			return answers.map((answer) => {
				return answer.id === idAnswer
					? {
							...answer,
							isPicked: !answer.isPicked,
					  }
					: {
							...answer,
							isPicked: false,
					  };
			});
		});

		props.savePickedAnswers(idQuestion, answer);
	}

	function stylize(item) {
		if (props.gameOver && item.isPicked && props.isCorrect) {
			return {
				background: '#94D7A2',
				border: '2px solid #94D7A2',
				color: 'inherit',
			};
		} else if (props.gameOver && item.isPicked && !props.isCorrect) {
			return {
				background: '#F8BCBC',
				border: '2px solid #F8BCBC',
				textDecoration: 'line-through',
			};
		} else if (item.isPicked && !props.gameOver) {
			return {
				background: '#D6DBF5',
				border: '2px solid #848fc3',
			};
		} else if (props.gameOver && item.answer === props.correctAnswer) {
			return {
				background: '#b0e1ba',
				border: '2px solid #b0e1ba',
			};
		} else if (!item.isPicked && !props.gameOver) {
			return {
				background: 'none',
				border: '2px solid #4D5B9E',
			};
		}
	}

	const answersHtml = answerState.map((item) => {
		return (
			<AnswerBtn
				id={item.id}
				key={item.id}
				style={stylize(item)}
				onClick={() => {
					toggle(item.id, props.questionId, item.answer);
				}}
				disabled={props.gameOver}
			>
				{decode(item.answer)}
			</AnswerBtn>
		);
	});

	return <>{answersHtml}</>;
};
