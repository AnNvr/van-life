import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { checkEmail, createUser } from "../api";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Registration() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [emailAlert, setEmailAlert] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from || "/login";

    function togglePassword(e) {
        e.preventDefault()
        setShowPassword(prevState => !prevState)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const isEmailAvailable = await checkEmail(formData.email)

        if (isEmailAvailable) {
            createUser(formData)
            setEmailAlert(false)
            navigate(from, { replace: true })
        } else {
            setEmailAlert(true)
        }
    }

    return(
        <div>
            <h1>Howdy wanderlust! Create your account now!</h1>
            <p>Use an inexistent email address and a simple password</p>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Email</label>
                <input
                    required
                    name="email"
                    type="email"
                    onChange={handleChange}
                    placeholder="user@server.com"
                />
                </div>
                <div>
                <label>Password</label>\
                <input
                    required
                    name="password"
                    type="password"
                    onChange={handleChange}
                    placeholder="Password"
                    minLength="6"
                />
                <button onClick={togglePassword}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
                </div>

                {emailAlert ? (
                    <p>This email already exist - try another email</p>
                ) : null} 
                <button>Registration</button>
                <p>Do you have an account?
                    <Link
                        to="/login"
                        className=""
                        >
                        Log In
                    </Link>
                </p>
            </form>
        </div>
    )
}