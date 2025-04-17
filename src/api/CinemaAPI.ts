import { Cinema } from "../types/Cinema";
import { apiClient } from "./Client";

const getAllCinemas = async () => {
    let res = await apiClient.get('/cinema');
    let data: Cinema[] = res.data?.data;
    return data;
}

const getCinemaById = async (id: string | undefined) => {
    let res = await apiClient.get(`/cinema/${id}`);
    let data: Cinema = res.data?.data;
    return data;
}

const addCinema = async (cinema: Cinema) => {
    try {
        let res = await apiClient.post(`/cinema`, cinema);
        return res.data?.message;
    }
    catch (error: any) {
        if (error.response) {
            return error.response.data.message;
        }
        else {
            console.log(error);
        }
    }
}

const updateCinema = async (id: string, cinema: Cinema) => {
    try {
        let res = await apiClient.put(`/cinema/${id}`, cinema);
        return res.data?.message;
    }
    catch (error: any) {
        if (error.response) {
            return error.response.data.message;
        }
        else {
            console.log(error);
        }
    }
}

const deleteCinema = async (id: string) => {
    try {
        let res = await apiClient.delete(`/cinema/${id}`);
        return res.data?.message;
    }
    catch (error: any) {
        if (error.response) {
            return error.response.data.message;
        }
        else {
            console.log(error);
        }
    }
}

export {getAllCinemas, getCinemaById, addCinema, updateCinema, deleteCinema}