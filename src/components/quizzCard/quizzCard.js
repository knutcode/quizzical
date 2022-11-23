import { decode } from 'html-entities';
import { Choice, ChoiceContainer, ChoiceWrapper } from './styles';

export const QuizzCard = (props) => {
	const choices = props.answers.map((item, i) => {
		return (
			<ChoiceWrapper key={i}>
				<Choice isClicked={props.isClicked}>{decode(item)}</Choice>
			</ChoiceWrapper>
		);
	});

	return (
		<>
			<h2>{props.question}</h2>
			<ChoiceContainer>{choices}</ChoiceContainer>
		</>
	);
};
