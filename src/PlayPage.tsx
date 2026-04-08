import { useNavigate } from "react-router";
import type { GameResult } from "./GameResults";
import { useEffect, useState } from "react";

type PlayProps = {
    addNewGameResult: (g: GameResult) => void;
    setTitle: (t: string) => void;
    players: string[];
};

export const Play: React.FC<PlayProps> = ({
    addNewGameResult,
    setTitle,
    players,
}) => {

    useEffect(
        () => setTitle("Play"),
        [],
    );

    const nav = useNavigate();
    const [startTimestamp] = useState(new Date().toISOString());

    return (
        <>
            <div className="card bg-base-100 w-full shadow-lg my-2">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title">Game Over</h2>
                    <div className="flex flex-col gap-2 mt-2">
                        {
                            players.map(
                                x => (
                                    <button key={x} className="btn btn-lg w-full lg:w-64" onClick={() => {
                                                addNewGameResult({
                                                    winner: x,
                                                    players: players,
                                                    start: startTimestamp,
                                                    end: new Date().toISOString(),
                                                });
                                                nav(-2);
                                            }
                                        }
                                    >
                                        {
                                            `${x} Won`
                                        }
                                    </button>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};