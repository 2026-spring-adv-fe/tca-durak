import { useNavigate } from "react-router";

export const Home = () => {
    const nav = useNavigate();
    //code
    return (
        <>
        <h1>Home</h1>
        <button className="btn btn-primary btn-outline" onClick={
            () => nav('/Setup')
        }>Setup a Game</button>
        </>
    );
};