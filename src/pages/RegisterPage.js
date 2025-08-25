import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import bgImage from "../images/1.png";

export default function RegisterPage({ onRegister }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            if (data.token) {
                onRegister(data.token);
                navigate("/workouts");
            } else {
                Swal.fire(
                    "Success",
                    "Registration successful! Please login.",
                    "success"
                );
                navigate("/login");
            }
        } catch (err) {
            Swal.fire("Registration Failed", err.message, "error");
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="btn btn-primary w-100">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
