import { useNavigate } from "react-router";
import type { GeneralFacts, LeaderboardEntry, AvgGameDuration } from "./GameResults";
import { useEffect } from "react";

export const APP_TITLE = "Durak Companion";

type HomeProps = {
    generalFacts: GeneralFacts;
    avgGameDurationsByPlayerCount: AvgGameDuration[];

    leaderboard: LeaderboardEntry[];
    setTitle: (t: string) => void;
};

export const Home: React.FC<HomeProps> = ({
    generalFacts,
    avgGameDurationsByPlayerCount: foo,
    leaderboard,
    setTitle,
}) => {

    console.log(foo);
    useEffect(() => setTitle(APP_TITLE), []);

    const nav = useNavigate();

    const mostDurak =
        leaderboard.length === 0
            ? null
            : leaderboard.reduce((max, current) =>
                  current.durakTimes > max.durakTimes ? current : max
              );

    return (
        <>
            <div className="card-body p-4 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <button
                        className="btn btn-lg w-full lg:w-auto"
                        onClick={() => nav("/setup")}
                    >
                        Setup a Game
                    </button>
                </div>
            </div>

            <div className="card bg-base-100 w-full shadow-lg my-5 overflow-x-scroll">
                <div className="card-body p-2">
                    <h2 className="card-title text-nowrap">Game Stats</h2>
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
                    <h2 className="card-title text-nowrap">Durak Leaderboard</h2>
                    {leaderboard.length === 0 ? (
                        <p>No players found.</p>
                    ) : (
                        <table className="table table-zebra">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <th>Escapes</th>
                                    <th>Durak Times</th>
                                    <th>Escape Rate</th>
                                </tr>
                                {leaderboard.map((entry) => (
                                    <tr key={entry.name}>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <span>{entry.name}</span>
                                                {mostDurak?.name === entry.name &&
                                                    entry.durakTimes > 0 && (
                                                        <span className="badge">
                                                            🃏
                                                        </span>
                                                    )}
                                            </div>
                                        </td>
                                        <td>{entry.escapes}</td>
                                        <td>{entry.durakTimes}</td>
                                        <td>{entry.escapeRate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <div className="card bg-base-100 w-full shadow-lg my-5">
                <div className="card-body p-2">
                    <h2 className="card-title text-nowrap">avg game durations</h2>
                            {foo.length === 0 ? (
                                <p>no players found</p>
                    ) : (
                        <table className="table table-zebra">
                            <tbody>
                                <tr>
                                    <td>number of players</td>
                                    <th>number of games</th>
                                    <th>avg game duration</th>
                                </tr>
                                {foo.map((entry) => (
                                    <tr key={entry.numberOfPlayers}>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <span>{entry.numberOfPlayers}</span>
                                            </div>
                                        </td>
                                        <td>{entry.numberOfGames}</td>
                                        <td>{entry.avgGameDuration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};