import { AxiosError } from "axios";
import { User } from "../types/User";
import { apiClient } from "./Client";

const getAllUser = async () => {
    let res = await apiClient.get('/user');
    let data: User[] = res.data?.data;
    return data;
}

const getUserById = async (id: string | undefined) => {
    let res = await apiClient.get(`/user/${id}`);
    let data: User = res.data?.data;
    return data;
}

const addUser = async (user: User) => {
    try {
        let res = await apiClient.post(`/user/register`, user);
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

const updateUser = async (id: string, user: User) => {
    try {
        let res = await apiClient.put(`/user/${id}`, user);
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

const deleteUser = async (id: string) => {
    try {
        let res = await apiClient.delete(`/user/${id}`);
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

export {getAllUser, getUserById, addUser, updateUser, deleteUser}