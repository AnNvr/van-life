import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import { logoutUser } from "../api";

export default function Navbar() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logoutUser()
            navigate("/login")
        } catch (error) {
            console.log("Logout failed", error)
        }
    }

    const activeStyle = {
        borderBottom: '2px solid black',
    /*     paddingBottom: '0.25rem', */
        color: 'black'
    };

    return(
        <div className="bg-[#FFF7ED] flex flex-wrap justify-between items-center px-6 py-4 md:py-10">
            <NavLink 
                to="/" 
                exact 
                className="text-xl md:text-3xl lg:text-5xl font-bold font-cursive" 
                style={({ isActive }) => isActive ? activeStyle : null}>
                #VANLIFE
            </NavLink>
            <div className="flex flex-wrap justify-center mt-4 md:mt-0 space-x-4 md:space-x-6 lg:space-x-10">
                <NavLink
                    to="/host"
                    className="font-semibold md:text-2xl hover:border-b-2 text-[#161616] hover:border-black hover:text-black"
                    style={({ isActive }) => isActive ? activeStyle : null}>
                    Host
                </NavLink>
                <NavLink
                    to="/about"
                    className="font-semibold md:text-2xl hover:border-b-2 text-[#161616] hover:border-black hover:text-black"
                    style={({ isActive }) => isActive ? activeStyle : null}>
                    About
                </NavLink>
                <NavLink
                    to="/vans"
                    className="font-semibold md:text-2xl hover:border-b-2 text-[#161616] hover:border-black hover:text-black"
                    style={({ isActive }) => isActive ? activeStyle : null}>
                    Vans
                </NavLink>
                {currentUser ? (
                    <button
                        onClick={handleLogout}
                        className="font-semibold md:text-2xl hover:border-b-2 text-[#161616] hover:border-black hover:text-black"
                        >Log Out</button>
                ) : (
                <Link
                    to="/login"
                    className="text-lg md:text-xl lg:text-2xl px-2 hover:bg-gray-200 rounded-full">
                    <i class="fa-regular fa-circle-user"></i>
                </Link>
                )}
            </div>
        </div>
    );
}
