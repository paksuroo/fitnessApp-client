import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function AddWorkoutModal({
    show,
    handleClose,
    handleSave,
    workout,
}) {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [status, setStatus] = useState("pending");

    useEffect(() => {
        if (workout) {
            setName(workout.name);
            setDuration(workout.duration);
            setStatus(workout.status?.toLowerCase() || "pending");
        } else {
            setName("");
            setDuration("");
            setStatus("pending");
        }
    }, [workout]);

    const onSave = () => {
        if (!name || !duration) {
            alert("Please fill in all fields");
            return;
        }
        handleSave({
            name,
            duration,
            status: status.toLowerCase(),
            _id: workout?._id,
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {workout ? "Edit Workout" : "Add Workout"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Workout Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter workout name"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Duration (minutes)</Form.Label>
                        <Form.Control
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="Enter duration"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
