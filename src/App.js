import { QuizzCard } from './components/QuizzCard';
import { StartScreen } from './components/StartScreen';
import { SVGYellow } from './components/SVGYellow';
import { SVGBlue } from './components/SVGBlue';
import useQuizzGame from './hooks/useQizzGame';

function App() {
	const { gameState, setGameState, points, countPoints, category, changeCategory, fetchData, quizzData } = useQuizzGame();

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
