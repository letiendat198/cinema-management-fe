import { Seat } from "../types/Seat";
import { apiClient } from "./Client";

const getSeatMapByRoomId = async (roomId: string) => {
    let res = await apiClient.get(`/seat/${roomId}`);
    let data: Seat[] = res.data?.data;
    return data;
}

const addSeatMap = async (seat: Seat) => {
    try {
        let res = await apiClient.post(`/seat`, seat);
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

const updateSeatMap = async (id: string, seat: Seat) => {
    try {
        let res = await apiClient.put(`/seat/${id}`, seat);
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

const deleteSeatMap = async (id: string) => {
    try {
        let res = await apiClient.delete(`/seat/${id}`);
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

export {getSeatMapByRoomId, addSeatMap, updateSeatMap, deleteSeatMap}