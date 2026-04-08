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
        previousPlayers.map(
            x => ({
                name: x,
                checked: false,
            })
        )
    );

    useEffect(
        () => setTitle("Setup"),
        [],
    );
    const nav = useNavigate();

    const [newPlayerName, setNewPlayerName] = useState("");
    const dupePlayerName = availablePlayers.some(
        x => x.name === newPlayerName
    );

    const twoPlayersChosen = availablePlayers.filter(
        x => x.checked
    ).length >= 2;
    return (
        <>
            <button 
                className="btn btn-lg w-full lg:w-64 mb-4" onClick={() => {
                        setCurrentPlayers(
                            availablePlayers
                                .filter(
                                    x => x.checked
                                )
                                .map(
                                    x => x.name
                                )
                        );
                        nav('/play');
                    }
                }
                disabled={
                    !twoPlayersChosen
                }
            >
                {
                    !twoPlayersChosen
                        ? 'Choose 2 Players'
                        : 'Start Game'
                }
            </button>
            <div className="card bg-base-100 w-full shadow-lg my-2">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title">add player</h2>
                    <div className="join w-full mt-2">
                        <input 
                            type="text"
                            className={`input join-item ${dupePlayerName ? 'input-error' : ''}`} 
                            placeholder="New Player Name" 
                            value={newPlayerName}
                            onChange={
                                (e) => setNewPlayerName(
                                    e.target.value
                                )
                            }
                        />
                        <button 
                            className="btn join-item "
                            onClick={() => {
                                    setAvailablePlayers(
                                        [
                                            ...availablePlayers,
                                            {
                                                name: newPlayerName,
                                                checked: true,
                                            },
                                        ].sort(
                                            (a, b) => a.name.localeCompare(b.name)
                                        )
                                    );

                                    setNewPlayerName(
                                        ""
                                    );
                                }
                            }
                            disabled={
                                newPlayerName.length === 0 || dupePlayerName
                            }
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
            <div className="card bg-base-100 w-full shadow-lg my-2">
                <div className="card-body p-4 sm:p-6">
                    <h2 className="card-title">choose 2 players</h2>
                    <div className="mt-2">
                        {
                            availablePlayers.map(
                                x => (
                                    <label
                                        key={x.name}
                                        className="block mt-2"
                                    >
                                        <input 
                                            type="checkbox"
                                            className="checkbox mr-2"
                                            checked={x.checked} 
                                            onChange={
                                                () => setAvailablePlayers(
                                                    availablePlayers.map(
                                                        y => ({
                                                            name: y.name,
                                                            checked: y.name === x.name
                                                                ? !y.checked
                                                                : y.checked
                                                            ,
                                                        })
                                                    )
                                                )
                                            }
                                        />
                                        {x.name}
                                    </label>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
};