import imageAbout from '../assets/about.png';
import { useNavigate } from 'react-router-dom';

export default function About() {

    const navigate = useNavigate()

    const containerStyle = {
        backgroundImage: `url(${imageAbout})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className='h-auto font-manrope'>
            <div
                className="h-40 md:h-64 lg:h-screen bg-cover bg-center"
                style={containerStyle}
            ></div>
            <div className='flex flex-col justify-center text-[#161616] mx-4 my-10'>
                <h1 className='text-3xl font-bold font-cursive'>Don`t squeeze in a sedan when you could relax in a van.</h1>
                <p className='leading-relaxed my-4'>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch. (Hitch costs extra 😉) </p>
                <p className='leading-relaxed mb-8'>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                <div className='bg-[#FFCC8D] rounded-lg py-8 px-4 md:w-1/2'>
                    <h2 className='font-bold text-2xl'>Your destination is waiting.</h2>
                    <h2 className='font-bold text-2xl pb-6'>Your van is ready.</h2>
                    <button
                        onClick={() => navigate("/vans")}
                        className='bg-[#161616] text-white font-semibold py-4 px-10 rounded-lg'>Explore our vans</button>
                </div>
            </div>
        </div>
    )
}