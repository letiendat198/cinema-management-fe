import dayjs from "dayjs";
import { isCinema } from "../types/Cinema";
import { Button } from "@mantine/core";
import { Order } from "../types/Order";
import { getPaymentUrlForOrder } from "../api/PaymentAPI";

interface Props {
    order: Order
}

function OrderBox({ order }: Props) {
    const redirectToPay = (orderId: string) => {
        getPaymentUrlForOrder(orderId).then(url => {
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
            if (newWindow) newWindow.opener = null;
        })
    }

    return (
        <div className="flex flex-col gap-2 border-gray-400 border-2 p-4 rounded-lg">
            <div className="flex gap-4"  key={order._id}>
                <img className="self-start w-35 aspect-2/3" src={order.showtime.movieID.img} />
                <div className="flex flex-col gap-2">
                    <p className="text-2xl font-semibold">{order.showtime.movieID.title}</p>
                    <p><span className="font-semibold">Location: </span>{isCinema(order.showtime.roomID.cinemaID) ? order.showtime.roomID.cinemaID.name + " - " + order.showtime.roomID.cinemaID.location : ""}</p>
                    <p><span className="font-semibold">Room: </span>{order.showtime.roomID.roomNumber} - <span className="font-semibold">Seat: </span> {order.seatsLabel.join(", ")}</p>   
                    <p><span className="font-semibold">Time: </span>{dayjs(order.showtime.startTime).format('HH:mm')} - {dayjs(order.showtime.endTime).format('HH:mm')}</p> 
                    <p><span className="font-semibold">Additional:</span> {order.complementItems.map(e => e.item.name + " x " + e.quantity).join(", ")}</p>
                    <p><span className="font-semibold">Price:</span> {order.totalPrice.toLocaleString('vi-VI', {style: 'currency', currency: 'VND'})}</p>
                    {/* <p><span className="font-semibold">Status:</span> {order.status.toUpperCase()}</p> */}
                </div>
            </div>  
            {order.status == "pending" ? <Button className="self-end mt-auto" onClick={() => redirectToPay(order._id)}>Finish payment</Button> : <></>}   
        </div>
        
    )
}

export default OrderBox;