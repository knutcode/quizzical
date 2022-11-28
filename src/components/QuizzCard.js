import { Answers } from './Answers';
import {
	AnswersContainer,
	CardContainer,
	EventButton,
	QuestionContainer,
	QuizzScreen,
	Score,
	ScoreContainer,
} from './styles';
import { useEffect, useState } from 'react';

export const QuizzCard = (props) => {
	const data = props.questions.map((question) => {
		return {
			id: question.id,
			question: question.question,
			correctAnswer: question.correctAnswer,
			answers: question.answers,
			playerAnswer: '',
			isCorrect: 'no data',
		};
	});

	const [questionState, setQuestionState] = useState(data);

	useEffect(() => {
		setQuestionState(data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.questions]);

	const quizzCardHtml = questionState.map((item) => {
		return (
			<QuestionContainer key={item.id}>
				<h2>{item.question}</h2>
				<AnswersContainer>
					<Answers
						questionId={item.id}
						answers={item.answers}
						correctAnswer={item.correctAnswer}
						isCorrect={item.isCorrect}
						savePickedAnswers={savePickedAnswers}
						gameOver={props.gameState.isOver}
					/>
				</AnswersContainer>
			</QuestionContainer>
		);
	});

	function savePickedAnswers(idQuestion, answer) {
		setQuestionState((questions) => {
			return questions.map((question) => {
				return question.id === idQuestion
					? {
							...question,
							playerAnswer: answer,
					  }
					: question;
			});
		});
	}

	function checkAnswers() {
		props.setGameState((prevState) => {
			return { ...prevState, isOver: true };
		});

		questionState.forEach((question) => {
			if (question.correctAnswer === question.playerAnswer) {
				props.countPoints();
				question.isCorrect = true;
			} else {
				question.isCorrect = false;
			}
		});
	}

	return (
		<QuizzScreen>
			<CardContainer>{quizzCardHtml}</CardContainer>
			{!props.gameState.isOver ? (
				<EventButton onClick={() => checkAnswers()}>check answers</EventButton>
			) : (
				<ScoreContainer>
					<Score>You got {props.points}/5 correct answers</Score>
					<EventButton onClick={() => props.restart()}>Play again</EventButton>
				</ScoreContainer>
			)}
		</QuizzScreen>
	);
};
