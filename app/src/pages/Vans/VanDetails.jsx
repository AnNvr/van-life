import { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { vanStyles } from "./Vans";
import { getVan } from "../../api";
import Spinner from "../../components/Spinner";

export default function VanDetails() {
    const [vanByID, setVanByID] = useState({
        ID: "",
        name: "",
        price: "",
        description: "",
        imageUrl: "",
        type: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getVan(id);
                setVanByID(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadVans();
    }, [id]);

    // loading here:
    if (loading) {
        return <Spinner />;
    }

    const search = location.state?.search || "";
    const typeOfVan = location.state?.type || "all";

    const { ID, name, price, description, imageUrl, type } = vanByID;

    return (
        <div key={ID} className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                {/* Back link above the image for all screen sizes */}
                <div className="md:col-span-3 mb-4">
                    <Link to={`..${search}`} className="back-button text-lg">
                        &larr; <span>Back to {typeOfVan} vans</span>
                    </Link>
                </div>

                {/* Image in the first column on medium screens and onwards */}
                <div className="md:col-span-3">
                    <Link to={`/vans/${id}`}>
                        <img
                            src={imageUrl}
                            alt={name}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </Link>
                </div>

                {/* Content in the second and third columns on medium screens and onwards */}
                <div className="md:col-span-2 text-[#161616]">
                    <div className="block">
                        <span
                            style={vanStyles[type]}
                            className="inline-block rounded-md px-6 py-2 text-lg font-semibold text-white mr-2 mb-2"
                        >
                            {type}
                        </span>
                        <h3 className="text-xl md:text-3xl font-bold my-4">
                            {name}
                        </h3>
                        <p className="block my-2 text-lg leading-tight font-semibold text-black">
                            {`$${price}`}
                            <span>/day</span>
                        </p>
                        <p className="font-semibold mb-4 text-gray-700 text-base">{description}</p>
                        <button className="w-full md:w-auto px-8 md:px-20 bg-[#FF8C38] hover:bg-[#e57a33] transition-colors duration-300 ease-in-out my-4 py-2 md:py-4 text-white text-lg md:text-xl font-semibold rounded-md">
                            Rent this van
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
