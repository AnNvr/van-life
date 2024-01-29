import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
    const activeStyle = {
        borderBottom: '2px solid black',
        color: 'black'
    };

    return(
        <div className="bg-[#FFF7ED] flex justify-between items-center px-6 py-10">
            <NavLink 
                to="/" 
                exact 
                className="text-4xl font-bold font-cursive" 
                style={({ isActive }) => isActive ? activeStyle : null}>
                #VANLIFE
            </NavLink>
            <div className="space-x-10">
                <NavLink
                    to="/host"
                    className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                    style={({ isActive }) => isActive ? activeStyle : null}>
                    Host
                </NavLink>
                <NavLink
                    to="/about"
                    className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                    style={({ isActive }) => isActive ? activeStyle : null}>
                    About
                </NavLink>
                <NavLink
                    to="/vans"
                    className="font-semibold hover:border-b-2 text-[#4d4d4d] hover:border-black hover:text-black"
                    style={({ isActive }) => isActive ? activeStyle : null}>
                    Vans
                </NavLink>
                <Link to="/login">
                    <i class="fa-regular fa-circle-user"></i>
                </Link>
            </div>
        </div>
    );
}
