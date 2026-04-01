<<<<<<< Updated upstream
import { useEffect } from "react";
import { useNavigate } from "react-router";

type SetupProps = {
    setTitle: (t: string) => void;
}

export const Setup: React.FC<SetupProps> = ({ setTitle }) => {
=======
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Player = {
    name: string;
    checked: boolean;
};

type SetupProps = {
    setTitle: (t: string) => void;
    previousPlayers: string[];
    setCurrentPlayers: (players: Player[]) => void;
};

export const Setup: React.FC<SetupProps> = ({
    setTitle,
    previousPlayers,
    setCurrentPlayers
}) => {
    const [availablePlayers, setAvailablePlayers] = useState<Player[]>(
        previousPlayers.map(x => ({ name: x, checked: false }))
    );

>>>>>>> Stashed changes
    const nav = useNavigate();

    useEffect(() => {
        setTitle("Setup Screen");
    }, [setTitle]);

    return (
        <>
<<<<<<< Updated upstream
       
        <button className="btn  btn-soft btn-lg w-full lg:w-64" onClick={
            () => nav('/PlayPage')
        }>Play the game</button>
=======
            <button
                className="btn btn-soft btn-lg w-full lg:w-64"
                onClick={() => {
                    const selected = availablePlayers.filter(p => p.checked);
                    setCurrentPlayers(selected);
                    nav("/PlayPage");
                }}
            >
                Play the game
            </button>

            <div className="mt-4">
                {availablePlayers.map(x => (
                    <label key={x.name} className="block mt-2">
                        <input
                            type="checkbox"
                            className="mr-2 size-4"
                            checked={x.checked}
                            onChange={() =>
                                setAvailablePlayers(
                                    availablePlayers.map(y => ({
                                        name: y.name,
                                        checked: y.name === x.name ? !y.checked : y.checked
                                    }))
                                )
                            }
                        />
                        {x.name}
                    </label>
                ))}
            </div>
>>>>>>> Stashed changes
        </>
    );
};