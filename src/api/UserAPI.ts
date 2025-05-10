import { AxiosError } from "axios";
import { User } from "../types/User";
import { apiClient } from "./Client";

const loginUser = async (username: string, password: string) => {
    try {
        let res = await apiClient.post(`/user/login`, {username, password});

        return res.data.user;
    }
    catch (error: any) {
        if (error.response) {
            throw error.response.data.message;
        }
        else {
            throw error;
            console.log(error);
        }
    }
}

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

const addUser = async (user: User | {username: string, password: string, email: string}) => {
    try {
        let res = await apiClient.post(`/user/register`, user);
        return res.data?.user;
    }
    catch (error: any) {
        if (error.response) {
            throw error.response.data.message;
        }
        else {
            throw error;
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

export {loginUser, getAllUser, getUserById, addUser, updateUser, deleteUser}