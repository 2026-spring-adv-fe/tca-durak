import { useNavigate } from "react-router";
import type { GeneralFacts, LeaderboardEntry } from "./GameResults";
export const APP_TITLE = "Durak Companion";

 type HomeProps = {
    generalFacts: GeneralFacts,
    leaderboard: LeaderboardEntry[],
    setTitle: (t: string) => void;
 };

export const Home: React.FC<HomeProps> = ({
    generalFacts,
    leaderboard,
    setTitle
}) => {
    
   setTitle(APP_TITLE);

    const nav = useNavigate();
    //code
    return (
        <>
        <button className="btn  btn-soft btn-lg w-full lg:w-64" onClick={
            () => nav('/Setup')
        }>Setup a Game</button>

            <div className="card bg-base-100 w-full shadow-lg my-5 overflow-x-scroll">
        <div className="card-body p-2">
            <h2 className="card-title text-nowrap">General Facts</h2>
            <table className="table table-zebra">
                <tbody>
                    <tr>
                        <td>Last Played</td>
                        <th>{generalFacts.lastPlayed}</th>
                    </tr>
                    <tr>
                        <td>Total Games</td>
                        <th>{generalFacts.totalGames}</th>
                    </tr>
                    <tr>
                        <td>Shortest Game</td>
                        <th>{generalFacts.shortestGame}</th>
                    </tr>
                    <tr>
                        <td>Longest Game</td>
                        <th>{generalFacts.longestGame}</th>
                    </tr>
                </tbody>
            </table>
        </div>
            </div>
            <div className="card bg-base-100 w-full shadow-lg my-5">
            <div className="card-body p-2">
            <h2 className="card-title text-nowrap">Leaderboard</h2>
            {
                leaderboard.length === 0 
                ? <p>No players found. </p>
                :
            <table className="table table-zebra">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Average</th>
                    </tr>
                    {leaderboard.map((entry) => (
                        <tr key={entry.name}>
                            <td>{entry.name}</td>
                            <td>{entry.wins}</td>
                            <td>{entry.losses}</td>
                            <td>{entry.avg}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
                }
                </div>
            </div>
        </>
    );
};