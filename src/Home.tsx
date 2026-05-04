import { useNavigate } from "react-router";
import type {
    GeneralFacts,
    LeaderboardEntry,
    AvgGameDuration,
    gameCountByMonth,
    GameResult,
} from "./GameResults";
import { useEffect, useRef } from "react";

export const APP_TITLE = "Durak Companion";

type HomeProps = {
    generalFacts: GeneralFacts;
    avgGameDurationsByPlayerCount: AvgGameDuration[];
    gameCountByMonth: gameCountByMonth[];
    leaderboard: LeaderboardEntry[];
    gameResults: GameResult[];
    setTitle: (t: string) => void;
    gameHistory: {
        date: string;
        duration: string;
        players: string;
    }[];
};

export const Home: React.FC<HomeProps> = ({
    generalFacts,
    avgGameDurationsByPlayerCount,
    gameCountByMonth,
    leaderboard,
    gameResults,
    gameHistory,
    setTitle,
}) => {
    useEffect(() => setTitle(APP_TITLE), [setTitle]);

    const nav = useNavigate();
    const rulesDialog = useRef<HTMLDialogElement | null>(null);

    const safeGeneralFacts = generalFacts ?? {
        lastPlayed: "—",
        totalGames: 0,
        shortestGame: "—",
        longestGame: "—",
    };

    const safeLeaderboard = leaderboard ?? [];
    const safeGameResults = gameResults ?? [];
    const safeAvgDurations = avgGameDurationsByPlayerCount ?? [];
    const safeGameCountByMonth = gameCountByMonth ?? [];
    const safeGameHistory = gameHistory ?? [];
    const mostDurak =
        safeLeaderboard.length === 0
            ? null
            : safeLeaderboard.reduce((max, current) =>
                  current.durakTimes > max.durakTimes ? current : max
              );

    const bestEscapePlayer =
        safeLeaderboard.length === 0
            ? null
            : safeLeaderboard.reduce((best, current) => {
                  const bestRate = Number.parseFloat(
                      String(best.escapeRate).replace("%", "")
                  );
                  const currentRate = Number.parseFloat(
                      String(current.escapeRate).replace("%", "")
                  );

                  return currentRate > bestRate ? current : best;
              });

    const trumpSuitCounts = safeGameResults.reduce<Record<string, number>>(
        (acc, game) => {
            if (!game.trumpSuit) return acc;
            acc[game.trumpSuit] = (acc[game.trumpSuit] || 0) + 1;
            return acc;
        },
        {}
    );

    const mostCommonTrump =
        Object.keys(trumpSuitCounts).length === 0
            ? null
            : Object.entries(trumpSuitCounts).reduce((max, current) =>
                  current[1] > max[1] ? current : max
              );

    const getSuitSymbol = (suit?: string) => {
        switch (suit) {
            case "hearts":
                return "♥";
            case "diamonds":
                return "♦";
            case "clubs":
                return "♣";
            case "spades":
                return "♠";
            default:
                return "🂠";
        }
    };

    const getSuitColorClass = (suit?: string) => {
        return suit === "hearts" || suit === "diamonds"
            ? "text-red-500"
            : "text-base-content";
    };

    return (
        <>
            <div className="card bg-base-100 w-full shadow-lg my-5 border border-base-300">
                <div className="card-body p-4 sm:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold">
                                Durak Companion
                            </h1>
                            <p className="text-base-content/70 mt-2">
                                Track rounds, spot patterns, and see who keeps
                                becoming the durak.
                            </p>
                        </div>
                            <div className="flex flex-col gap-3 w-full">
                            <button
                                className="btn btn-outline w-full"
                                onClick={() => rulesDialog.current?.showModal()}
                            >
                                Rules
                            </button>

                            <button
                                className="btn btn-neutral w-full"
                                onClick={() => nav("/setup")}
                            >
                                Setup a Game
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 my-5">
                <div className="card bg-base-100 shadow-lg border border-base-300 hover:-translate-y-1 hover:shadow-2xl transition">
                    <div className="card-body items-center text-center p-5">
                        <div className="text-4xl mb-2">🃏</div>
                        <h2 className="font-bold text-lg">Most Durak</h2>
                        <p className="text-xl font-semibold">
                            {mostDurak ? mostDurak.name : "—"}
                        </p>
                        <p className="text-sm text-base-content/60">
                            {mostDurak
                                ? `${mostDurak.durakTimes} durak times`
                                : "No data yet"}
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg border border-base-300 hover:-translate-y-1 hover:shadow-2xl transition">
                    <div className="card-body items-center text-center p-5">
                        <div
                            className={`text-4xl mb-2 ${getSuitColorClass(
                                mostCommonTrump?.[0]
                            )}`}
                        >
                            {getSuitSymbol(mostCommonTrump?.[0])}
                        </div>
                        <h2 className="font-bold text-lg">Favorite Trump</h2>
                        <p className="text-xl font-semibold capitalize">
                            {mostCommonTrump ? mostCommonTrump[0] : "—"}
                        </p>
                        <p className="text-sm text-base-content/60">
                            {mostCommonTrump
                                ? `${mostCommonTrump[1]} times`
                                : "No data yet"}
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg border border-base-300 hover:-translate-y-1 hover:shadow-2xl transition">
                    <div className="card-body items-center text-center p-5">
                        <div className="text-4xl mb-2">🎮</div>
                        <h2 className="font-bold text-lg">Total Games</h2>
                        <p className="text-xl font-semibold">
                            {safeGeneralFacts.totalGames}
                        </p>
                        <p className="text-sm text-base-content/60">
                            All recorded rounds
                        </p>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-lg border border-base-300 hover:-translate-y-1 hover:shadow-2xl transition">
                    <div className="card-body items-center text-center p-5">
                        <div className="text-4xl mb-2">🏆</div>
                        <h2 className="font-bold text-lg">Best Escape Rate</h2>
                        <p className="text-xl font-semibold">
                            {bestEscapePlayer ? bestEscapePlayer.name : "—"}
                        </p>
                        <p className="text-sm text-base-content/60">
                            {bestEscapePlayer
                                ? bestEscapePlayer.escapeRate
                                : "No data yet"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="card bg-base-100 w-full shadow-lg my-5 border border-base-300 overflow-x-auto">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title text-2xl">Game Stats</h2>
                    <table className="table table-zebra mt-3">
                        <tbody>
                            <tr>
                                <td>Last Played</td>
                                <th>{safeGeneralFacts.lastPlayed}</th>
                            </tr>
                            <tr>
                                <td>Total Games</td>
                                <th>{safeGeneralFacts.totalGames}</th>
                            </tr>
                            <tr>
                                <td>Shortest Game</td>
                                <th>{safeGeneralFacts.shortestGame}</th>
                            </tr>
                            <tr>
                                <td>Longest Game</td>
                                <th>{safeGeneralFacts.longestGame}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card bg-base-100 w-full shadow-lg my-5 border border-base-300 overflow-x-auto">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title text-2xl">Durak Leaderboard</h2>

                    {safeLeaderboard.length === 0 ? (
                        <p className="mt-3 text-base-content/70">
                            No players found.
                        </p>
                    ) : (
                        <table className="table table-zebra mt-3">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Escapes</th>
                                    <th>Durak Times</th>
                                    <th>Escape Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {safeLeaderboard.map((entry) => (
                                    <tr key={entry.name}>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <span>{entry.name}</span>
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

            <div className="card bg-base-100 w-full shadow-lg my-5 border border-base-300 overflow-x-auto">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title text-2xl">
                        Average Game Durations
                    </h2>

                    {safeAvgDurations.length === 0 ? (
                        <p className="mt-3 text-base-content/70">
                            No players found.
                        </p>
                    ) : (
                        <table className="table table-zebra mt-3">
                            <thead>
                                <tr>
                                    <th>Number of Players</th>
                                    <th>Number of Games</th>
                                    <th>Avg Game Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {safeAvgDurations.map((entry) => (
                                    <tr key={entry.numberOfPlayers}>
                                        <td>{entry.numberOfPlayers}</td>
                                        <td>{entry.numberOfGames}</td>
                                        <td>{entry.avgGameDuration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <div className="card bg-base-100 w-full shadow-lg my-5 border border-base-300 overflow-x-auto">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title text-2xl">Game Count by Month</h2>

                    {safeGameCountByMonth.length === 0 ? (
                        <p className="mt-3 text-base-content/70">
                            No games found.
                        </p>
                    ) : (
                        <table className="table table-zebra mt-3">
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Game Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {safeGameCountByMonth.map((entry) => (
                                    <tr key={entry.month}>
                                        <td>{entry.month}</td>
                                        <td>{entry.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            <div className="card bg-base-100 w-full shadow-lg my-5 border border-base-300 overflow-x-auto">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title text-2xl">Game History</h2>

                    {safeGameHistory.length === 0 ? (
                        <p className="mt-3 text-base-content/70">
                            No games found.
                        </p>
                    ) : (
                        <table className="table table-zebra mt-3">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Duration</th>
                                    <th>Players</th>
                                </tr>
                            </thead>
                            <tbody>
                                {safeGameHistory.map((entry, index) => (
                                    <tr key={`${entry.date}-${entry.duration}-${index}`}>
                                        <td>{entry.date}</td>
                                        <td>{entry.duration}</td>
                                        <td>{entry.players}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            

            <dialog ref={rulesDialog} className="modal">
                <div className="modal-box max-w-2xl">
                    <h3 className="font-bold text-2xl mb-4">Durak Rules</h3>

                    <div className="space-y-5 text-sm sm:text-base leading-6">
                        <div>
                            <h4 className="font-semibold mb-2 text-lg">
                                How to play (very simple)
                            </h4>

                            <ul className="list-disc pl-5 space-y-2">
                                <li>Each player gets 6 cards.</li>

                                <li>
                                    One card is opened from the deck. Its suit
                                    becomes the <b>trump</b>.
                                </li>

                                <li>
                                    The first player attacks by putting a card
                                    on the table.
                                </li>

                                <li>
                                    The defender must beat that card:
                                    <ul className="list-disc pl-5 mt-1 space-y-1">
                                        <li>same suit + higher card</li>
                                        <li>or any trump card</li>
                                    </ul>
                                </li>

                                <li>
                                    If the defender <b>cannot beat</b> the
                                    attack, they take all the cards.
                                </li>

                                <li>
                                    If the defender <b>beats all cards</b>, the
                                    round ends and the turn moves on.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2 text-lg">
                                Important rules
                            </h4>

                            <ul className="list-disc pl-5 space-y-2">
                                <li>Trump suit beats all non-trump suits.</li>

                                <li>
                                    After each round, players draw cards from
                                    the deck until they have 6 again.
                                </li>

                                <li>
                                    When the deck is empty, players do not draw
                                    any more cards.
                                </li>

                                <li>
                                    If a player has <b>0 cards</b>, they are
                                    safe.
                                </li>

                                <li>
                                    The last player still holding cards is the{" "}
                                    <b>Durak</b>.
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-neutral">Close</button>
                        </form>
                    </div>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
};