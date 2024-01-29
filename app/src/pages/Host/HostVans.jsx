import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getHostVans } from "../../api";


export default function HostVans() {
    const [vans, setVans] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadVans() {
            try {
                const data = await getHostVans()
                setVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, []);

    const vansElement = vans.map((van) => (
        <Link
            to={`/host/vans/${van.id}`}
            key={van.id}
            className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden mb-4 transform transition duration-500 hover:scale-105"
        >
            <img
                src={van.imageUrl}
                alt={van.name}
                className="w-24 h-24 object-cover"
            />
            <div className="p-4 flex-grow">
                <h3 className="font-semibold text-gray-800">{van.name}</h3>
                <p className="text-gray-600">${van.price}<span>/day</span></p>
            </div>
        </Link>
    ));

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (

        <div className="p-4 max-w-5xl mx-auto min-h-screen">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your listed vans</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {vansElement}
            </div>
        </div>

    );
}

