import React, { useState } from 'react';
import { decode } from 'html-entities';
import { nanoid } from 'nanoid';
import { AnswerBtn } from './styles';
import useStylizeAnswers from '../hooks/useStylizeAnswers';

export const Answers = (props) => {
	const { stylize } = useStylizeAnswers(props.gameOver, props.isCorrect, props.correctAnswer);

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
