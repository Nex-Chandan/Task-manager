import axios from "axios"

const API=axios.create({
    baseURL:"http://localhost:5000/api",
})


API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

//auth

export const registerUser=(data)=>API.post("/auth/register",data)
export const loginUser=(data)=>API.post("/auth/login",data);
export const getMe=()=>API.get("/auth/me");


//task
export const fetchTasks = () => API.get("/tasks");
export const fetchTask = () => API.get("/tasks");
export const createTask = (data) => API.post("/tasks", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}/status`, data);
export const toggleStatus = (id) => API.patch(`/tasks/${id}/status`);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
