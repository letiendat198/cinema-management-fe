import { Item } from "../types/Item";
import { apiClient } from "./Client";

const getAllItems = async () => {
    let res = await apiClient.get('/complement-item');
    let data: Item[] = res.data?.data;
    return data;
}

const getItemById = async (id: string | undefined) => {
    let res = await apiClient.get(`/complement-item/${id}`);
    let data: Item = res.data?.data;
    return data;
}

const addItem = async (item: Item) => {
    try {
        let res = await apiClient.post(`/complement-item`, item);
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

const updateItem = async (id: string, item: Item) => {
    try {
        let res = await apiClient.put(`/complement-item/${id}`, item);
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

const deleteItem = async (id: string) => {
    try {
        let res = await apiClient.delete(`/complement-item/${id}`);
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

export {getAllItems, getItemById, addItem, updateItem, deleteItem}