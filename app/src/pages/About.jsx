import imageAbout from "../assets/westfalia.jpg";
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen flex flex-col font-manrope flex-grow bg-cover bg-center bg-no-repeat h-64 md:h-1/2"
            style={{ backgroundImage: `url(${imageAbout})` }}
            >
                <div className="h-full flex flex-col justify-center bg-black bg-opacity-30 p-4 md:p-8">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-cursive text-white">
                        Don't squeeze in a sedan when you could relax in a van.
                    </h1>
                </div>

            <div className="flex-1 flex items-center justify-start p-4 md:p-8">
                <div className="max-w-2xl w-full">
                    <div className="bg-[#FFCC8D] rounded-lg p-8 text-left">
                        <h2 className="font-bold md:text-3xl text-xl">
                            Your destination is waiting!
                        </h2>
                        <h2 className="font-bold md:text-3xl text-xl mb-6">
                            Your van is ready!
                        </h2>
                        <p className="mb-6 md:text-lg">
                            Our mission is to enliven your road trip with the perfect travel van rental.
                            Our team is full of vanlife enthusiasts who know firsthand the magic of touring...
                        </p>
                        <button
                            onClick={() => navigate("/vans")}
                            className="bg-[#161616] text-white font-semibold py-2 px-8 rounded-lg hover:bg-opacity-90 transition-opacity"
                        >
                            Explore our vans
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

