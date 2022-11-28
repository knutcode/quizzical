import { StartScreenContainer, EventButton } from './styles';

export const StartScreen = (props) => {
	return (
		<StartScreenContainer>
			<h1>Quizzical</h1>
			<select onChange={props.changeCategory}>
				<option value="0">Random category</option>
				<option value="11">Movies</option>
				<option value="15">Video Games</option>
				<option value="31">Japanese Anime & Manga</option>
			</select>
			<br />
			<EventButton
				onClick={() => {
					props.fetchData();
				}}
			>
				Start quiz
			</EventButton>
		</StartScreenContainer>
	);
};
