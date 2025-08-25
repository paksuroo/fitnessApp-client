import React from "react";

export default function WorkoutCard({ workout, onEdit, onDelete, onComplete }) {
    const status = workout.status?.toLowerCase();

    return (
        <div className="card p-3 h-100">
            <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">{workout.name}</h5>
                <button
                    className="btn btn-sm btn-success"
                    onClick={() => onComplete(workout._id)}
                    disabled={status === "completed"}
                >
                    Complete
                </button>
            </div>

            <p className="card-text mt-2">Duration: {workout.duration} min</p>

            <span
                className={`badge-status ${
                    status === "completed" ? "badge-completed" : "badge-pending"
                }`}
            >
                {status}
            </span>

            <div className="d-flex justify-content-end mt-3 gap-3">
                <button
                    className="btn btn-sm btn-primary"
                    onClick={() => onEdit(workout)}
                >
                    Edit
                </button>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(workout._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
