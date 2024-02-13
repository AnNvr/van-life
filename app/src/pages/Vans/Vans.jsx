import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";
import Spinner from "../../components/Spinner";

export const vanStyles = {
    simple: {
        backgroundColor: "#E17654",
        fontFamily: "cursive"
    },
    luxury: {
        backgroundColor: "#161616",
        fontFamily: "cursive"
    },
    rugged: {
        backgroundColor: "#115E59",
        fontFamily: "cursive"
    },
};

export default function Vans() {
    const [vans, setVans] = useState([]);
    // state for handling error messages
    const [error, setError] = useState(null);
    // state for loading
    const [loading, setLoading] = useState(false);

    // define params for filtering vans by type
    const [searchParams, setSearchParams] = useSearchParams();
    const typeFilter = searchParams.get("type");

    useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getVans();
                setVans(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadVans();
    }, []);

    // error handling here:
    if (error) {
        return (
            <div aria-live="assertive">
                <div role="alert" className="alert alert-error">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>Error! {error.message}</span>
                </div>
            </div>
        );
    }

    // loading here:
    if (loading) {
        return <Spinner />
    }

    // if searchParams exists, filter the van with the type conditions
    const filteredVans = typeFilter
        ? vans.filter((van) => van.type === typeFilter)
        : vans;

    const vansElements = filteredVans.map((van) => (
        <div key={van.id} className="rounded-lg py-4">
            <Link
                to={`/vans/${van.id}`}
                className="block"
                state={{
                    search: `?${searchParams.toString()}`,
                    type: typeFilter,
                }}
            >
                <img
                    src={van.imageUrl}
                    style={{ width: "300px", height: "300px" }}
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <div className="p-4 flex justify-between items-center">
                    <h3 className="font-bold text-xl my-2">{van.name}</h3>
                    <p className="block mt-1 text-lg leading-tight font-semibold text-black">
                        ${van.price}
                        <span>/day</span>
                    </p>
                </div>
                <i
                    style={vanStyles[van.type]}
                    className={`rounded-md px-6 py-2 text-lg font-semibold not-italic text-white mr-2 mb-2`}
                >
                    {van.type}
                </i>
            </Link>
        </div>
    ));

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-8 p-4 text-center font-cursive">
                Explore our van options
            </h2>

            <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center mb-8">
                <div className="flex gap-4 mb-4 lg:mb-0">

                <button
                    className="bg-[#FFEAD0] px-4 py-2 rounded-lg font-cursive font-semibold"
                    onClick={() => setSearchParams({ type: "simple" })}>
                    Simple
                </button>
                <button
                    className="bg-[#FFEAD0] px-4 py-2 rounded-lg font-cursive font-semibold"
                    onClick={() => setSearchParams({ type: "luxury" })}>
                    Luxury
                </button>
                <button
                    className="bg-[#FFEAD0] px-4 py-2 rounded-lg font-cursive font-semibold"
                    onClick={() => setSearchParams({ type: "rugged" })}>
                    Rugged
                </button>
                {typeFilter ? (
                    <button
                    className="bg-[#FFEAD0] px-4 py-2 rounded-lg font-cursive font-semibold"    
                    onClick={() => setSearchParams({})}>Clear</button>
                ) : null}
            </div>
                </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center mb-14">
                {vansElements}
            </div>
        </div>
    );
}
