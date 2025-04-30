import { useEffect, useState } from "react";
import { useRestrictUser } from "../hooks/restrictUser";
import { useUserStore } from "../hooks/userStore";
import { getOrderByUserId } from "../api/OrderAPI";
import { Order } from "../types/Order";
import { isCinema } from "../types/Cinema";
import dayjs from "dayjs";
import { Button } from "@mantine/core";

function UserTicket() {
    useRestrictUser('user');
    const [orders, setOrders] = useState<Order[]>([]);

    const userID = useUserStore(state => state.user)?._id;

    useEffect(() => {
        getOrderByUserId(userID).then(data => setOrders(data))
    }, [])

    return (
        <div>
            <p className="text-3xl font-bold">My ticket</p>
            <div className="flex flex-col gap-2 mt-4">
                {orders.map(order => {
                    return (
                        <div className="flex gap-4 border-gray-400 border-2 p-4 rounded-lg" key={order._id}>
                            <img className="w-50 aspect-2/3" src={order.showtime.movieID.img} />
                            <div className="flex flex-col gap-2">
                                <p className="text-2xl font-semibold">{order.showtime.movieID.title}</p>
                                <p><span className="font-semibold">Location: </span>{isCinema(order.showtime.roomID.cinemaID) ? order.showtime.roomID.cinemaID.name + " - " + order.showtime.roomID.cinemaID.location : ""}</p>
                                <p><span className="font-semibold">Time: </span>{dayjs(order.showtime.startTime).format('HH:mm')} - {dayjs(order.showtime.endTime).format('HH:mm')}</p> 
                                <p><span className="font-semibold">Room {order.showtime.roomID.roomNumber}:</span> {order.seatsLabel.join(", ")}</p>   
                                <p><span className="font-semibold">Additional:</span> {order.complementItems.map(e => e.item.name + " x " + e.quantity).join(", ")}</p>
                                <p><span className="font-semibold">Price:</span> {order.totalPrice.toLocaleString('vi-VI', {style: 'currency', currency: 'VND'})}</p>
                                <p><span className="font-semibold">Status:</span> {order.status.toUpperCase()}</p>
                                {order.status == "pending" ? <Button className="self-start mt-auto">Finish payment</Button> : <></>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserTicket;