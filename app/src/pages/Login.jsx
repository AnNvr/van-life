import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api.js";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/host"; // After login, redirect to the route in location.state.from or to "/host"

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("submitting"); // Reset err state and set status to submit

        try {
            await loginUser({ email: formData.email, password: formData.password })
            navigate(from, { replace: true })
        } catch (err) {
            setError(err)
            console.log("Error loggin in: ", err.message)
        } finally {
            setStatus("idle")
        }
    }

    async function handleRegister(email, password) {
        try {
            const userCredential = await registerUser(email, password)
                navigate(from, { replace: true })
                return userCredential
        } catch (err) {
            setError(err)
            console.log("Error registering user: " + err.message)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    return (
        <div>
            {location.state?.message && <h3>{location.state.message}</h3>}
            <h1>Sign in to your account</h1>
            {error?.message && <h3>{error.message}</h3>}

            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button disabled={status === "submitting"}>
                    {status === "submitting" ? "Logging in..." : "Log in"}
                </button>
            </form>
            <button
                type="button"
                onClick={handleRegister}
                disabled={status === "submitting"}
            >
                Register
            </button>
        </div>
    );
}
