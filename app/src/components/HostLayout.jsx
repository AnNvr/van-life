import { NavLink, Outlet } from "react-router-dom";

export const activeStyle = {
    borderBottom: '2px solid black',
    color: 'black'
};

export default function HostLayout() {
    return (
        <>
            <nav className="bg-[#FFF7ED] flex justify-around items-center px-6 py-10">
                <NavLink
                    end
                    style={({ isActive }) => isActive ? activeStyle : null}
                    className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                    to="/host"
                >
                    Dashboard
                </NavLink>
                <NavLink
                    style={({ isActive }) => isActive ? activeStyle : null}
                    className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                    to="income"
                >
                    Income
                </NavLink>
                <NavLink
                    style={({ isActive }) => isActive ? activeStyle : null}
                    className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                    to="vans"
                >
                    Vans
                </NavLink>
                <NavLink
                    style={({ isActive }) => isActive ? activeStyle : null}
                    className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                    to="reviews"
                >
                    Reviews
                </NavLink>
            </nav>
            <Outlet />
        </>
    );
}
