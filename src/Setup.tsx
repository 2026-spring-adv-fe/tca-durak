import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type SetupProps = {
    setTitle: (t: string) => void;
    previousPlayers: string[];
    setCurrentPlayers: (players: string[]) => void;
};

export const Setup: React.FC<SetupProps> = ({
    setTitle,
    previousPlayers,
    setCurrentPlayers,
}) => {
    const [availablePlayers, setAvailablePlayers] = useState(
        previousPlayers.map(x => ({
            name: x,
            checked: false,
        }))
    );

    const [trumpSuit, setTrumpSuit] = useState<string | null>(null);

    useEffect(() => setTitle("Setup"), []);

    const nav = useNavigate();

    const [newPlayerName, setNewPlayerName] = useState("");

    const dupePlayerName = availablePlayers.some(
        x => x.name === newPlayerName
    );

    const twoPlayersChosen =
        availablePlayers.filter(x => x.checked).length >= 2;

    return (
        <>
            {/* START BUTTON */}
            <button
                className="btn btn-lg w-full lg:w-64 mb-4"
                onClick={() => {
                    setCurrentPlayers(
                        availablePlayers
                            .filter(x => x.checked)
                            .map(x => x.name)
                    );

                    // пока просто лог — потом можно передавать дальше
                    console.log("Trump suit:", trumpSuit);

                    nav("/play");
                }}
                disabled={!twoPlayersChosen || !trumpSuit}
            >
                {
                    !twoPlayersChosen
                        ? "Choose 2 Players"
                        : !trumpSuit
                        ? "Choose Trump Suit"
                        : "Start Game"
                }
            </button>

            {/* ADD PLAYER */}
            <div className="card bg-base-100 w-full shadow-lg my-2">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title">add player</h2>

                    <div className="join w-full mt-2">
                        <input
                            type="text"
                            className={`input join-item ${
                                dupePlayerName ? "input-error" : ""
                            }`}
                            placeholder="New Player Name"
                            value={newPlayerName}
                            onChange={(e) =>
                                setNewPlayerName(e.target.value)
                            }
                        />

                        <button
                            className="btn join-item"
                            onClick={() => {
                                setAvailablePlayers(
                                    [
                                        ...availablePlayers,
                                        {
                                            name: newPlayerName,
                                            checked: true,
                                        },
                                    ].sort((a, b) =>
                                        a.name.localeCompare(b.name)
                                    )
                                );

                                setNewPlayerName("");
                            }}
                            disabled={
                                newPlayerName.length === 0 ||
                                dupePlayerName
                            }
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>

            {/* CHOOSE PLAYERS */}
            <div className="card bg-base-100 w-full shadow-lg my-2">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title">choose 2 players</h2>

                    <div className="mt-2">
                        {availablePlayers.map(x => (
                            <label key={x.name} className="block mt-2">
                                <input
                                    type="checkbox"
                                    className="checkbox mr-2"
                                    checked={x.checked}
                                    onChange={() =>
                                        setAvailablePlayers(
                                            availablePlayers.map(y => ({
                                                name: y.name,
                                                checked:
                                                    y.name === x.name
                                                        ? !y.checked
                                                        : y.checked,
                                            }))
                                        )
                                    }
                                />
                                {x.name}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* TRUMP SUIT */}
            <div className="card bg-base-100 w-full shadow-lg my-2">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title">choose trump suit</h2>

                    <div className="flex gap-4 mt-4 justify-center text-3xl">
                        {[
                            { suit: "hearts", icon: "♥" },
                            { suit: "clubs", icon: "♣" },
                            { suit: "diamonds", icon: "♦" },
                            { suit: "spades", icon: "♠" },
                        ].map(({ suit, icon }) => (
                            <div
                                key={suit}
                                onClick={() => setTrumpSuit(suit)}
                                className={`
                                        cursor-pointer w-14 h-14 flex items-center justify-center rounded-full
                                        border-2 transition-all duration-200
                                        ${
                                            trumpSuit === suit
                                            ? "border-red-500 bg-red-100"
                                            : "border-gray-300 hover:border-red-400"
                                        }
                                        ${
                                            suit === "hearts" || suit === "diamonds"
                                            ? "text-red-500"
                                            : "text-black"
                                        }
                                        `}
                            >
                                {icon}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};