import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../api.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/host"; // After login, redirect to the route in location.state.from or to "/host"

    async function handleSubmit(e) {
        e.preventDefault();

        // TEST:
        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("User logged in:", userCredential.user);
            navigate(from, { replace: true })
        } catch (error) {
            setError(error)
            console.log("Error loggin in: ", error.message)
        } finally {
            setStatus("idle")
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
            <div className="hero min-h-screen bg-[#FFEAD0] flex items-center justify-center">
                <div className="card w-full max-w-md shadow-2xl bg-white p-5 rounded">
                    <div className="card-body">
                        {location.state?.message && <p className="text-center text-lg text-green-600">{location.state.message}</p>}
                        <h2 className="card-title text-center text-3xl font-bold">Sign in to your account</h2>
                        {error && <p className="text-center text-red-600">{error.message}</p>}
    
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="form-control">
                                <label className="label" htmlFor="email">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email address"
                                    className="input input-bordered w-full"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="password">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className="input input-bordered w-full"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={status === "submitting"}
                            >
                                {status === "submitting" ? "Logging in..." : "Log in"}
                            </button>
                        </form>
    
                        <div className="divider">OR</div>
    
                        <button
                            type="button"
                            className="btn btn-outline btn-accent w-full"
                            onClick={() => navigate('/register')}
                            disabled={status === "submitting"}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
    );
}
