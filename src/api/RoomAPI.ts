import { Room } from "../types/Room";
import { apiClient } from "./Client";

const getRoomsByCinemaId = async (id: string | undefined) => {
    let res = await apiClient.get(`/room/${id}`);
    let data: Room[] = res.data?.data;
    return data;
}

const addRoom = async (room: Room) => {
    try {
        let res = await apiClient.post(`/room`, room);
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

const updateRoom = async (id: string, room: Room) => {
    try {
        let res = await apiClient.put(`/room/${id}`, room);
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

const deleteRoom = async (id: string) => {
    try {
        let res = await apiClient.delete(`/room/${id}`);
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

export {getRoomsByCinemaId, addRoom, updateRoom, deleteRoom}