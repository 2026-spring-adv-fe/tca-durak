import { useNavigate } from "react-router";

export const Setup = () => {
    const nav = useNavigate();
    //code
    return (
        <>
       
        <button className="btn  btn-soft btn-lg w-full lg:w-64" onClick={
            () => nav('/PlayPage')
        }>Play the game</button>
        </>
    );
};