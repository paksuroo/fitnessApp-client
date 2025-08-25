import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WorkoutsPage from "./pages/WorkoutsPage";

export default function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) setToken(savedToken);
    }, []);

    const handleLogin = (jwt) => {
        setToken(jwt);
        localStorage.setItem("token", jwt);
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <Router>
            <div className="main-content">
                <Navbar token={token} onLogout={handleLogout} />
                <Routes>
                    <Route
                        path="/login"
                        element={
                            !token ? (
                                <LoginPage onLogin={handleLogin} />
                            ) : (
                                <Navigate to="/workouts" />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            !token ? (
                                <RegisterPage onRegister={handleLogin} />
                            ) : (
                                <Navigate to="/workouts" />
                            )
                        }
                    />
                    <Route
                        path="/workouts"
                        element={
                            token ? (
                                <WorkoutsPage token={token} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}
