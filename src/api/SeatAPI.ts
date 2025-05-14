import { Seat } from "../types/Seat";
import { apiClient } from "./Client";

const getSeatsByRoomId = async (id: string | undefined) => {
    let res = await apiClient.get(`/seat/${id}`);
    let data: Seat[] = res.data?.data;
    return data;
}

const createSeatForRoom = async (id: string | undefined) => {
    try {
        let res = await apiClient.post(`/seat/${id}`);
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

const updateSeats = async (seats: Seat[]) => {
    try {
        let res = await apiClient.put(`/seat/`, seats);
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

export {getSeatsByRoomId, createSeatForRoom, updateSeats}