import { SeatMap } from "../types/SeatMap";
import { apiClient } from "./Client";

const getSeatMapByRoomId = async (roomId: string) => {
    let res = await apiClient.get(`/seatmap/${roomId}`);
    let data: SeatMap[] = res.data?.data;
    return data;
}

const addSeatMap = async (seatmap: SeatMap) => {
    try {
        let res = await apiClient.post(`/seatmap`, seatmap);
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

const updateSeatMap = async (id: string, seatmap: SeatMap) => {
    try {
        let res = await apiClient.put(`/seatmap/${id}`, seatmap);
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
        let res = await apiClient.delete(`/seatmap/${id}`);
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