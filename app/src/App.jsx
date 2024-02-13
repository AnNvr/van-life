import "../server.js";

import React from "react";
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


export default function App() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Hero />} />
                        <Route path="about" element={<About />} />
                        <Route path="vans" element={<Vans />} />
                        <Route path="vans/:id" element={<VanDetails />} />
                        <Route
                            path="login"
                            element={<Login />}
                        />
                        <Route
                            path="register"
                            element={<Registration />}
                        />
                        {/* Restricted routes for Host */}
                        <Route element={<AuthRequired />}>
                            <Route path="host" element={<HostLayout />}>
                                <Route index element={<Dashboard />} />
                                <Route path="income" element={<Income />} />
                                <Route path="reviews" element={<Reviews />} />
                                <Route path="vans" element={<HostVans />} />

                                <Route path="vans/:id" element={<HostVanDetails />}>
                                    <Route index element={<HostVanInfo />}/>
                                    <Route path="pricing" element={<HostVanPricing />}/>
                                    <Route path="photos" element={<HostVanPhotos />}/>
                                </Route>
                            </Route>
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}
