import "../server.js";

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Hero from "./pages/Hero";
import Vans from "./pages/Vans/Vans.jsx";
import VanDetails from "./pages/Vans/VanDetails.jsx";
import Dashboard from "./pages/Host/Dashboard.jsx";
import Income from "./pages/Host/Income.jsx";
import Reviews from "./pages/Host/Reviews.jsx";
import Layout from "./components/Layout.jsx";
import HostLayout from "./components/HostLayout.jsx";
import HostVans from "./pages/Host/HostVans.jsx";
import HostVanDetails from "./pages/Host/HostVanDetails.jsx";
import HostVanInfo from "./pages/Host/HostVanInfo.jsx";
import HostVanPricing from "./pages/Host/HostVanPricing.jsx";
import HostVanPhotos from "./pages/Host/HostVanPhotos.jsx";
import AuthRequired from "./components/auth/AuthRequired.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import NotFound from "./pages/NotFound.jsx";
import { auth } from "./api.js";
import { onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from "./components/auth/AuthProvider.jsx";

export default function App() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User is signed in:", user);
                setCurrentUser(user);
            } else {
                console.log("No user is signed in.");
                setCurrentUser(null);
            }
        });

        // cleanup subscription
        return () => unsubscribe();
    }, []);

    return (
        <React.StrictMode>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route
                            path="/"
                            element={<Layout currentUser={currentUser} />}
                        >
                            <Route index element={<Hero />} />
                            <Route path="about" element={<About />} />
                            <Route path="vans" element={<Vans />} />
                            <Route path="vans/:id" element={<VanDetails />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Registration />} />
                            {/* Restricted routes for Host */}
                            <Route element={<AuthRequired />}>
                                <Route path="host" element={<HostLayout />}>
                                    <Route index element={<Dashboard />} />
                                    <Route path="income" element={<Income />} />
                                    <Route
                                        path="reviews"
                                        element={<Reviews />}
                                    />
                                    <Route path="vans" element={<HostVans />} />

                                    <Route
                                        path="vans/:id"
                                        element={<HostVanDetails />}
                                    >
                                        <Route
                                            index
                                            element={<HostVanInfo />}
                                        />
                                        <Route
                                            path="pricing"
                                            element={<HostVanPricing />}
                                        />
                                        <Route
                                            path="photos"
                                            element={<HostVanPhotos />}
                                        />
                                    </Route>
                                </Route>
                            </Route>

                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
}
