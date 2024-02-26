import { NavLink, Outlet } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { FaVanShuttle, FaSackDollar } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";

export const activeStyle = {
    borderBottom: '2px solid black',
    paddingBottom: '0.25rem',
    color: 'black'
};

export default function HostLayout() {
    return (
        <>
            <nav className="bg-[#FFF7ED] flex flex-wrap justify-around items-center px-6 py-4 md:py-10 shadow-md">
                <NavLink
                    end
                    style={({ isActive }) => isActive ? activeStyle : null}
                    className="font-semibold hover:border-b-2 text-[#161616] hover:border-black hover:text-black"
                    to="/host"
                >
                    <MdDashboard className="inline md:hidden"/>
                    <span className="hidden md:inline">Dashboard</span>
                </NavLink>
                <NavLink
                    style={({ isActive }) => isActive ? activeStyle : null}
                    className="font-semibold hover:border-b-2 text-[#161616] hover:border-black hover:text-black"
                    to="income"
                >
                    <FaSackDollar className="inline md:hidden" />
                    <span className="hidden md:inline">Income</span>
                </NavLink>
                <NavLink
                    style={({ isActive }) => isActive ? activeStyle : null}
                    className="font-semibold hover:border-b-2 text-[#161616] hover:border-black hover:text-black"
                    to="vans"
                >
                    <FaVanShuttle className="inline md:hidden"/>
                    <span className="hidden md:inline">Vans</span>
                </NavLink>
                <NavLink
                    style={({ isActive }) => isActive ? activeStyle : null}
                    className="font-semibold hover:border-b-2 text-[#161616] hover:border-black hover:text-black"
                    to="reviews"
                >
                    <BsStars className="inline md:hidden"/>
                    <span className="hidden md:inline">Reviews</span>
                </NavLink>
            </nav>
            <Outlet />
        </>
    );
}
