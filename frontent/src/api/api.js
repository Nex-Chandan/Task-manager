import axios from "axios"

const API=axios.create({
    baseURL:"/api",
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
export const fetchTask=()=>API.get("/tasks");
export const createTask=(data)=>API.post("/tasks",data);
export const updateTask=(id,data)=>API.put(`/tasks/${id}/status`);
export const toggleStatus=(id)=>API.patch(`/tasks/${id}/status`);
export const deleteTask=(id)=>API.delete(`/tasks/${id}`);