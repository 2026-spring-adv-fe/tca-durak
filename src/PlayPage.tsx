import { useNavigate } from "react-router";
import type { GameResult } from "./GameResults";
import { useEffect, useState } from "react";

type PlayProps = {
    addNewGameResult: (g: GameResult) => void;
    setTitle: (t: string) => void;
};

export const PlayPage: React.FC<PlayProps> = ({ addNewGameResult, setTitle }) => {
    const nav = useNavigate();
    const [startTimeStamp] = useState(new Date().toISOString());
useEffect(
        () => setTitle("play"),
        [],
    );
    return (
        <>
            <button
                className="btn  btn-soft btn-lg w-full lg:w-64"
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