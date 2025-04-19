import { SeatType } from "../types/SeatType";
import { apiClient } from "./Client";

const getAllSeatTypes = async () => {
    let res = await apiClient.get('/seattype');
    let data: SeatType[] = res.data?.data;
    return data;
}

const addSeatType = async (seatType: SeatType) => {
    try {
        let res = await apiClient.post(`/seattype`, seatType);
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

const updateSeatType = async (id: string, seatType: SeatType) => {
    try {
        let res = await apiClient.put(`/seattype/${id}`, seatType);
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

const deleteSeatType = async (id: string) => {
    try {
        let res = await apiClient.delete(`/seattype/${id}`);
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

export {getAllSeatTypes, addSeatType, updateSeatType, deleteSeatType}