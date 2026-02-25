import { useNavigate } from "react-router";
import type { GeneralFacts } from "./GameResults";
 type HomeProps = {
    generalFacts: GeneralFacts;
    popularMove: string;
};

export const Home: React.FC<HomeProps> = ({
    generalFacts,
    popularMove
}) => {
    console.log('generalFacts:', generalFacts);
    console.log('popularMove:', popularMove);
    const nav = useNavigate();
    //code
    return (
        <>
        <h1>Home</h1>
                <div className="card bg-base-100 w-full shadow-lg">
                    <div className="card-body p-2">
                        <h2 className="card-title">Fact of the day</h2>
                                <p>{generalFacts?.lastPlayed ? `Last played: ${generalFacts.lastPlayed}` : "No fact available."}</p>
                                <p>{generalFacts?.totalGames !== undefined ? `Total games: ${generalFacts.totalGames}` : ""}</p>
                                <p>{generalFacts?.shortestGame ? `Shortest game: ${generalFacts.shortestGame}` : ""}</p>
                                <p>{generalFacts?.longestGame ? `Longest game: ${generalFacts.longestGame}` : ""}</p>
                    </div>
                </div>
                <div className="card bg-base-100 w-full shadow-lg mb-4">
                    <div className="card-body p-2">
                        <h2 className="card-title">Most popular move</h2>
                        <p>{popularMove}</p>
                    </div>
                </div>
        <button className="btn btn-primary btn-outline" onClick={
            () => nav('/Setup')
        }>Setup a Game</button>
        </>
    );
};