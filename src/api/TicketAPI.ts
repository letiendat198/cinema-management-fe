import { Ticket } from "../types/Ticket";
import { apiClient } from "./Client";

const getAllTickets = async () => {
    let res = await apiClient.get('/ticket');
    let data: Ticket[] = res.data?.data;
    return data;
}

const getTicketById = async (id: string | undefined)=> {
    let res = await apiClient.get(`/ticket/${id}`);
    let data: Ticket = res.data?.data;
    return data;
}

const getTicketByUserId = async (id: string | undefined)=> {
    let res = await apiClient.get(`/ticket/by-user/${id}`);
    let data: Ticket[] = res.data?.data;
    return data;
}

export {getAllTickets, getTicketById, getTicketByUserId}