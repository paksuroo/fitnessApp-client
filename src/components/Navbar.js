import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar({ token, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out from your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff7e5f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, logout",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("token");
                window.location.reload();
            }
        });
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-transparent">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    💪 Fitness Tracker
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span
                        className="navbar-toggler-icon"
                        style={{ filter: "invert(0)" }}
                    ></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {!token && (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item ms-2">
                                    <NavLink
                                        className="btn btn-link nav-link"
                                        to="/register"
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        )}
                        {token && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/workouts"
                                    >
                                        Workouts
                                    </NavLink>
                                </li>
                                <li className="nav-item ms-2">
                                    <button
                                        className="btn btn-link nav-link"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
