import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { auth } from "../api.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Registration() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [emailAlert, setEmailAlert] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [registrationSuccess, setRegistrationSuccess] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate()
    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    const buttonRef = useRef(null)
    const modalRef = useRef(null)
    const location = useLocation()
    const from = location.state?.from || "/login";

    useEffect(() => {
        // focus on email when the app mounts
        emailInputRef.current.focus()
    }, [])

    useEffect(() => {
        if (showModal) {
            modalRef.current.focus()
        }
    }, [showModal])

    function togglePasswordVisibility(e) {
        e.preventDefault()
        setShowPassword(prevState => !prevState)
    }

    function handleShowModal() {
        setShowModal(true)
    }

    function handleHideModal() {
        setShowModal(false)
    }

    function handleChange(e) {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // TEST:
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            console.log("User registered:", userCredential.user);
            setEmailAlert(false)
            setRegistrationSuccess(true)
            handleShowModal(true)
            setTimeout(() => {
                navigate('/host')
            }, 3000)
        } catch (error) {
            console.error("Error creating user: ", error);
            setError(error);
            setEmailAlert(true)
        }
    }

    return(
        <div className="flex min-h-screen items-center justify-center bg-[#FFEAD0]">
            {showModal && (
                <div className="modal" ref={modalRef} tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalDesc">
                    <div className="modal-content">
                    <h2 id="modalTitle">Registration Successful</h2>
                    <p id="modalDesc">You have successfully registered.</p>
                    <button onClick={handleHideModal} ref={buttonRef}>Close</button>
                    </div>
                </div>
            )}
            <div className="w-full max-w-md p-8 bg-white rounded shadow-2xl">
                <h1 className="text-3xl font-bold text-center">Create Your Account</h1>
                <p className="mt-2 text-center text-sm text-gray-600">Use an email that doesn't exist in our database.</p>
                
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="form-control">
                        <label htmlFor="email" className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            ref={emailInputRef}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="user@server.com"
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="password" className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={handleChange}
                                required
                                minLength="6"
                                className="input input-bordered w-full pr-10"
                                ref={passwordInputRef}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 mr-2 flex items-center text-lg"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {emailAlert && <p className="text-red-500 text-sm">This email already exists. Try another one.</p>}

                    <button
                    type="submit"
                    className={`w-full btn btn-primary ${isSubmitting === true ? "loading" : ""}`}
                    disabled={isSubmitting === true}
                    ref={buttonRef}
                >
                    {isSubmitting === true ? "Registering..." : "Register"}
                </button>

                    <p className="text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Log In
                        </Link>
                    </p>
                    {registrationSuccess && (
                    <div role="alert" className="alert alert-success">
                        <div className="flex-1">
                            <label>
                                <span className="label-text text-white">Registration successful! Redirecting to dashboard...</span>
                            </label>
                        </div>
                    </div>
                    )}
                </form>
            </div>
        </div>
    )
}