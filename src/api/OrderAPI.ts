import { Order, OrderTemp } from "../types/Order";
import { apiClient } from "./Client";

const getAllOrders = async () => {
    let res = await apiClient.get('/order');
    let data: OrderTemp[] = res.data?.data;
    return data;
}

const getOrderById = async (id: string | undefined)=> {
    let res = await apiClient.get(`/order/${id}`);
    let data: Order = res.data?.data;
    return data;
}

const getOrderByUserId = async (id: string | undefined)=> {
    let res = await apiClient.get(`/order/by-user/${id}`);
    let data: Order[] = res.data?.data;
    return data;
}

const addOrder = async (order: OrderTemp) => {
    try {
        let res = await apiClient.post(`/order`, order);
        let newOrderData: Order = res.data?.data 
        return newOrderData;
    }
    catch (error: any) {
        if (error.response) {
            throw error.response.data.message;
        }
        else {
            throw error;
        }
    }
}

const updateOrder = async (id: string, order: OrderTemp) => {
    try {
        let res = await apiClient.put(`/order/${id}`, order);
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

const deleteOrder = async (id: string) => {
    try {
        let res = await apiClient.delete(`/order/${id}`);
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

export {getAllOrders, getOrderById, getOrderByUserId, addOrder, updateOrder, deleteOrder}