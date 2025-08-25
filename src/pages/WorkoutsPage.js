import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import WorkoutCard from "../components/WorkoutCard";
import AddWorkoutModal from "../components/AddWorkoutModal";
import {
    getMyWorkouts,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    completeWorkoutStatus,
} from "../api";

export default function WorkoutsPage({ token }) {
    const [workouts, setWorkouts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentWorkout, setCurrentWorkout] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchWorkouts = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const data = await getMyWorkouts(token);
            setWorkouts(Array.isArray(data) ? data : []);
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchWorkouts();
    }, [token]);

    const handleSave = async (workout) => {
        try {
            if (workout._id) {
                await updateWorkout(
                    workout._id,
                    {
                        name: workout.name,
                        duration: workout.duration,
                        status: workout.status?.toLowerCase(),
                    },
                    token
                );

                Swal.fire(
                    "Success",
                    "Workout updated successfully!",
                    "success"
                );

                setWorkouts((prev) =>
                    prev.map((w) =>
                        w._id === workout._id
                            ? {
                                  ...w,
                                  name: workout.name,
                                  duration: workout.duration,
                                  status: workout.status?.toLowerCase(),
                              }
                            : w
                    )
                );
            } else {
                const response = await addWorkout(
                    {
                        name: workout.name,
                        duration: workout.duration,
                        status: workout.status?.toLowerCase() || "pending",
                    },
                    token
                );

                Swal.fire("Success", "Workout added successfully!", "success");

                if (response.newWorkout) {
                    setWorkouts((prev) => [response.newWorkout, ...prev]);
                } else {
                    fetchWorkouts();
                }
            }

            setShowModal(false);
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff7e5f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await deleteWorkout(id, token);
                Swal.fire(
                    "Deleted!",
                    "Your workout has been deleted.",
                    "success"
                );

                setWorkouts((prev) => prev.filter((w) => w._id !== id));
            } catch (err) {
                Swal.fire("Error", err.message, "error");
            }
        }
    };

    const handleComplete = async (id) => {
        try {
            const response = await completeWorkoutStatus(id, token);
            Swal.fire("Completed!", "Workout marked as completed.", "success");

            setWorkouts((prev) =>
                prev.map((w) =>
                    w._id === id ? { ...w, ...response.updatedWorkout } : w
                )
            );
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    return (
        <div className="workouts-container">
            <div className="workouts-content">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2>My Workouts</h2>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setCurrentWorkout(null);
                                setShowModal(true);
                            }}
                        >
                            + Add Workout
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div
                                className="spinner-border text-primary"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                            <p className="mt-2">Loading your workouts...</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {workouts.length > 0 ? (
                                workouts.map((w) => (
                                    <div
                                        className="col-12 col-md-6 col-lg-6"
                                        key={w._id}
                                    >
                                        <WorkoutCard
                                            workout={w}
                                            onEdit={(workout) => {
                                                setCurrentWorkout(workout);
                                                setShowModal(true);
                                            }}
                                            onDelete={handleDelete}
                                            onComplete={handleComplete}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center w-100 py-5">
                                    <div
                                        className="mb-3"
                                        style={{ fontSize: "3rem" }}
                                    >
                                        💪
                                    </div>
                                    <h4>No workouts yet</h4>
                                    <p className="text-muted">
                                        Get started by adding your first
                                        workout!
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    <AddWorkoutModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        handleSave={handleSave}
                        workout={currentWorkout}
                    />
                </div>
            </div>
        </div>
    );
}
