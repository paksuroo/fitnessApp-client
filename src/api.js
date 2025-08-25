const API_BASE = "https://fitnessapp-api-ln8u.onrender.com";

async function request(endpoint, method = "GET", body = null, token = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...(body && { body: JSON.stringify(body) }),
    };

    try {
        const res = await fetch(`${API_BASE}${endpoint}`, options);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Request failed");
        }

        return data;
    } catch (error) {
        throw new Error(error.message || "Network error");
    }
}

export const registerUser = (userData) =>
    request("/users/register", "POST", userData);

export const loginUser = (userData) =>
    request("/users/login", "POST", userData).then((data) => ({
        token: data.access,
    }));

export const addWorkout = (workoutData, token) =>
    request("/workouts/addWorkout", "POST", workoutData, token);

export const getMyWorkouts = (token) =>
    request("/workouts/getMyWorkouts", "GET", null, token).then((res) => {
        if (Array.isArray(res)) return res;
        if (Array.isArray(res?.workouts)) return res.workouts;
        if (Array.isArray(res?.data)) return res.data;
        return [];
    });

export const updateWorkout = (id, workoutData, token) =>
    request(`/workouts/updateWorkout/${id}`, "PATCH", workoutData, token);

export const deleteWorkout = (id, token) =>
    request(`/workouts/deleteWorkout/${id}`, "DELETE", null, token);

export const completeWorkoutStatus = (id, token) =>
    request(`/workouts/completeWorkoutStatus/${id}`, "PATCH", null, token);
