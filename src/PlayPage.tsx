import { useNavigate } from "react-router";
import type { GameResult } from "./GameResults";
import { useState } from "react";

type PlayProps = {
    addNewGameResult: (g: GameResult) => void;
};

export const PlayPage: React.FC<PlayProps> = ({ addNewGameResult }) => {
    const nav = useNavigate();
    const [startTimeStamp] = useState(new Date().toISOString());

    return (
        <>
            <h1>Play Page</h1>
            <button
                className="btn btn-primary btn-outline"
                onClick={() => {
                    addNewGameResult({
                        winner: "Snape",
                        players: ["Snape", "Dumbledore"],
                        start: startTimeStamp,
                        end: new Date().toISOString(),
                    });

                    nav(-2);
                }}
            >
                Game over
            </button>
        </>
    );
};