import { Schedule } from "../types/Schedule";
import { apiClient } from "./Client";

const getSchedulesByMovieId = async (id: string | undefined) => {
    let res = await apiClient.get(`/schedule/${id}`);
    let data: Schedule[] = res.data?.data;
    return data;
}

const addSchedule = async (schedule: Schedule) => {
    try {
        let res = await apiClient.post(`/schedule`, schedule);
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

const updateSchedule = async (id: string, schedule: Schedule) => {
    try {
        let res = await apiClient.put(`/schedule/${id}`, schedule);
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

const deleteSchedule = async (id: string) => {
    try {
        let res = await apiClient.delete(`/schedule/${id}`);
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

export {getSchedulesByMovieId, addSchedule, updateSchedule, deleteSchedule}