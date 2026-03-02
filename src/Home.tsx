import { useNavigate } from "react-router";
import type { GeneralFacts } from "./GameResults";
 type HomeProps = {
    generalFacts: GeneralFacts
 };

export const Home: React.FC<HomeProps> = ({
    generalFacts
}) => {
    
   

    const nav = useNavigate();
    //code
    return (
        <>
        <h1>Home</h1>
        <button className="btn btn-primary btn-outline" onClick={
            () => nav('/Setup')
        }>Setup a Game</button>

            <div className="card bg-base-100 w-full shadow-lg my-5">
        <div className="card-body p-2">
            <h2 className="card-title">General Facts</h2>
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
        </>
    );
};