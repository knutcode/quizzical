import styled from 'styled-components';

export const QuestionContainer = styled.div`
	border-bottom: 1px solid #dbdef0;
	@media (max-width: 780px) {
		display: flex;
		flex-direction: column;
	}
`;

export const AnswerBtn = styled.button`
	border-radius: 10px;
	padding: 4px 12px;
	min-width: 65px;
	margin-right: 13px;
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
