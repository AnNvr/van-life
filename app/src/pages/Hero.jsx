import heroImage from '../assets/hero.png';
import { useNavigate } from 'react-router-dom';

const textBoxStyles = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
    display: 'inline-block',
    padding: '1rem 2rem',
    borderRadius: '0.5rem',
}

export default function Hero() {
    const navigate = useNavigate();
    return (
        <section
            className="h-screen flex items-center bg-cover justify-center px-4 md:px-10 lg:px-16 xl:px-24"
            style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.7) 100%), url(${heroImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Content container with max-width for responsive text alignment */}
            <div className='max-w-3xl text-center' style={textBoxStyles}>
                <h1 className='font-cursive text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight'>
                    You got the <span className='text-orange-500'>travel</span> plans, we got the <span className='text-orange-500'>travel</span> vans!
                </h1>
                <p className='text-lg md:text-xl lg:text-2xl leading-normal my-6 md:my-8'>
                    Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.
                </p>
                <button
                    className='bg-orange-500 text-white font-semibold rounded-md py-3 px-6 hover:bg-orange-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
                    onClick={() => navigate("/vans")}
                >
                    Find your van
                </button>
            </div>
        </section>
    );
}
