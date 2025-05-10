import { apiClient } from "./Client";

const getPaymentUrlForOrder = async (orderId: string) => {
    let res = await apiClient.get(`/pay/payUrl/${orderId}`);
    let data: string = res.data?.data;
    return data;
}

export {getPaymentUrlForOrder}