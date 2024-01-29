import heroImage from '../assets/hero.png';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
    const navigate = useNavigate()
    return (
        <section
            className="bg-cover bg-no-repeat bg-center h-screen flex items-center"
            style={{ backgroundImage: `url(${heroImage})` }}
        >
            <div className='w-full px-4 md:px-10 lg:px-16 xl:px-24'>
                <h1 className='text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight'>
                    You got the travel plans, we got the travel vans.
                </h1>
                <p className='text-white text-base md:text-lg lg:text-xl leading-normal my-6 md:my-8'>
                    Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.
                </p>
                <button
                    className='bg-orange-500 text-white text-lg md:text-xl lg:text-2xl font-semibold rounded-md py-3 px-6 md:py-4 md:px-8 hover:bg-orange-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                    onClick={() => navigate("/vans")}
                    >
                    Find your van
                </button>
            </div>
        </section>
    )
}