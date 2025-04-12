import axios from 'axios' 

export const apiClient = axios.create({
    baseURL: import.meta.env.PROD ? "https://cinemamanagementbe-c8fpa5eyfecjddhv.eastasia-01.azurewebsites.net/" : "http://localhost:3000"
})