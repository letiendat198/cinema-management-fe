import axios from 'axios' 

export const apiClient = axios.create({
    baseURL: "https://cinemamanagementbe-c8fpa5eyfecjddhv.eastasia-01.azurewebsites.net/",
})