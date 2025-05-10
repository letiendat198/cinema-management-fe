import { Tabs } from "@mantine/core";
import { useRestrictUser } from "../hooks/restrictUser";
import { useEffect, useState } from "react";
import { Order } from "../types/Order";
import { useUserStore } from "../hooks/userStore";
import { getOrderByUserId } from "../api/OrderAPI";
import OrderBox from "../components/OrderBox";

function UserTicket() {
    useRestrictUser('user');
    const [orders, setOrders] = useState<Order[]>([]);

    const userID = useUserStore(state => state.user)?._id;

    useEffect(() => {
        getOrderByUserId(userID).then(data => setOrders(data))
    }, [])
    
    return (
        <div>
            <Tabs defaultValue='done'>
                <Tabs.List>
                    <Tabs.Tab value="done">
                        My tickets
                    </Tabs.Tab>
                    <Tabs.Tab value="pending">
                        Pending orders
                    </Tabs.Tab> 
                </Tabs.List>
                <Tabs.Panel value="done">
                    <p className="mt-4 text-3xl font-bold">My tickets</p>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {orders.map(order => {
                            if (order.status == 'pending') return;
                            return (
                                <div className="col-span-1">
                                    <OrderBox order={order} />    
                                </div>
                            )
                        })}
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value="pending">
                    <p className="mt-4 text-3xl font-bold">Pending orders</p>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        {orders.map(order => {
                            if (order.status != 'pending') return;
                            return (
                                <div className="col-span-1">
                                    <OrderBox order={order} />    
                                </div>
                            )
                        })}
                    </div>
                </Tabs.Panel>
            </Tabs>
        </div>
    )
}

export default UserTicket;