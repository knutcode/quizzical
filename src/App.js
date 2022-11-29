import { QuizzCard } from './components/QuizzCard';
import { StartScreen } from './components/StartScreen';
import { SVGYellow } from './components/SVGYellow';
import { SVGBlue } from './components/SVGBlue';
import useQuizzGame from './hooks/useQizzGame.js';
import useQuizzData from './hooks/useQuizzData';

function App() {
	const { gameState, setGameState, points, setPoints, countPoints, category, changeCategory } = useQuizzGame();
	const { quizzData, fetchData } = useQuizzData(setPoints, setGameState, category);

	return (
		<>
			{!gameState.isActive && (
				<StartScreen
					fetchData={fetchData}
					category={category}
					changeCategory={changeCategory}
				/>
			)}
			{quizzData && gameState.isActive && (
				<QuizzCard
					questions={quizzData}
					gameState={gameState}
					setGameState={setGameState}
					points={points}
					countPoints={countPoints}
					restart={fetchData}
				/>
			)}
			{!quizzData && gameState.isActive && <h2>Loading ...</h2>}
			<SVGYellow />
			<SVGBlue />
		</>
	);
}

export default App;
