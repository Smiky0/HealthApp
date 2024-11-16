import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col gap-4 h-full pt-32 items-center px-2">
            <img
                src="https://media.tenor.com/FrvJoGXmElQAAAAi/walfie-ame.gif"
                className="w-52"
            />
            <h1 className="text-7xl  text-black">404</h1>
            <h3 className="text-xl text-black/80 text-center">
                The page you are looking for doesn't exist.
            </h3>
            <button className="text-lg capitalize border-2 border-myteal text-black bg-myteal/80 p-2 px-4 rounded-3xl">
                Go to <Link to="/">Homepage</Link>
            </button>
        </div>
    );
}
