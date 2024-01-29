import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { vanStyles } from "./Vans";
import { getVan } from "../../api";

export default function VanDetails() {
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
    const location = useLocation();

    useEffect(() => {
        async function loadVans() {
            setLoading(true)
            try {
                const data = await getVan(id)
                setVanByID(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        loadVans()
    }, [id]);

    const search = location.state?.search || "";
    const typeOfVan = location.state?.type || "all"

    const { ID, name, price, description, imageUrl, type } = vanByID;

    return (
        <div key={ID} className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="md:col-span-1">
                    <Link
                        to={`..${search}`}
                        relative="path"
                        className="back-button"
                    >
                        &larr; <span>Back to {typeOfVan} vans</span>
                    </Link>
                    <Link to={`/vans/${id}`}>
                        <img
                            src={imageUrl}
                            className="w-full md:w-96 md:h-96 object-cover rounded-lg"
                        />
                    </Link>
                </div>
                <div className="text-[#161616] md:col-span-1">
                    <div className="block mt-8 md:mt-0">
                        <i
                            style={vanStyles[type]}
                            className={`rounded-md px-6 py-2 text-lg font-semibold not-italic text-white mr-2 mb-2`}
                        >
                            {type}
                        </i>
                        <h3 className="text-3xl font-bold my-8">{name}</h3>
                        <p className="text-2xl mb-8">
                            ${price}
                            <span>/day</span>
                        </p>
                        <p className="font-semibold mb-4 mt-4">{description}</p>
                    </div>
                    <button className="w-full md:w-auto md:px-20 bg-[#FF8C38] hover:bg-[#e57a33] transition-colors duration-300 ease-in-out mt-8 py-4 text-white text-xl font-semibold rounded-md">
                        Rent this van
                    </button>
                </div>
            </div>
        </div>
    );
}
