import styled from 'styled-components';

// QuizzCard.js

export const QuizzScreen = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 3rem 4.7rem;
	max-width: 1000px;
	@media (max-width: 768px) {
		text-align: center;
		max-width: 600px;
	}
`;

export const CardContainer = styled.div``;

export const QuestionContainer = styled.div`
	border-bottom: 1px solid #dbdef0;
	margin-bottom: 2rem;
`;

export const AnswersContainer = styled.div`
	display: flex;
	gap: 0.8rem;
	flex-wrap: wrap;
	margin-bottom: 2rem;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const ScoreContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

export const Score = styled.p`
	font-weight: 700;
	text-align: center;
	margin: 0;
`;

// Answers.js

export const AnswerBtn = styled.button`
	border-radius: 14px;
	padding: 4px 12px;
	min-width: 100px;
	color: inherit;
	background: none;
	cursor: pointer;
	:disabled {
		color: #8f94af;
		border: 2px solid #c0c3d0;
		background-color: '';
		cursor: default;
	}
`;

// App.js

export const StartScreenContainer = styled.div`
	text-align: center;
	> button {
		padding: 1.2rem 4.5rem;
	}
	> select {
		text-align: center;
		margin-bottom: 1rem;
		font-size: inherit;
		color: inherit;
		padding: 0.5em;
		border-radius: 10px;
		border: 1px solid #4d5b9e;
		background-color: #fffad1;
		cursor: pointer;
	}
`;

export const EventButton = styled.button`
	font-family: inherit;
	color: #f5f7fb;
	background-color: #4d5b9e;
	border: none;
	border-radius: 1em;
	padding: 0.8rem 2.5rem;
	cursor: pointer;
`;
