import { useState, useEffect } from "react";
import { useParams, Link, Outlet, NavLink } from "react-router-dom";
import { activeStyle } from "../../components/HostLayout";
import { getVan } from "../../api"; // to be changed if authentication is implemented
import Spinner from "../../components/Spinner";


export default function HostVanDetails() {
    const [vanByID, setVanByID] = useState({
        ID: "",
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        type: "",
    });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const { id } = useParams();

    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVan(id) // to be changed if authentication is implemented
                setVanByID(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [id]);

    // loading here:
    if (loading) {
        return <Spinner />
    }

    const { ID, name, price, description, imageUrl, type } = vanByID;

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <section className="min-h-screen p-8">
            <Link
                to=".." // going back one level in my routing structure
                relative="path" // mandatory property to define the routing structure
            >
                &larr;{" "}
                <span className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black">
                    Back to all vans
                </span>
            </Link>
            <div
                key={ID}
                className="mt-6 p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md"
            >
                <div className="flex gap-4">
                    <div className="flex items-center justify-between">
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-24 h-24 md:w-40 md:h-40 rounded-lg object-cover"
                        />
                    </div>
                    <div>
                        <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold uppercase rounded-md">
                            {type}
                        </span>
                        <h2 className="mt-2 text-2xl font-bold text-gray-700">
                            {name}{" "}
                        </h2>
                        <span className="text-xl text-[#161616]">${price}</span>
                        <span>/day</span>
                    </div>
                </div>

                <nav className="flex justify-around items-center px-6 py-10">
                    <NavLink
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                        className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                        to="."
                        end
                    >
                        Details
                    </NavLink>
                    <NavLink
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                        className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                        to="pricing"
                    >
                        Pricing
                    </NavLink>
                    <NavLink
                        style={({ isActive }) =>
                            isActive ? activeStyle : null
                        }
                        className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                        to="photos"
                    >
                        Photos
                    </NavLink>
                </nav>

                <Outlet context={{ vanByID }}/>

            </div>
        </section>
    );
}
