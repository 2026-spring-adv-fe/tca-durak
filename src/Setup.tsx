import { useEffect } from "react";
import { useNavigate } from "react-router";

type SetupProps = {
    setTitle: (t: string) => void;
}

export const Setup: React.FC<SetupProps> = ({ setTitle }) => {
    const nav = useNavigate();
    useEffect(
        () => setTitle("Setup Screen"),
        [],
    );
    //code
    return (
        <>
       
        <button className="btn  btn-soft btn-lg w-full lg:w-64" onClick={
            () => nav('/PlayPage')
        }>Play the game</button>
        </>
    );
};