import { Radio } from "@mantine/core";
import { Item, ItemDetail } from "../types/Item";
import { SeatDetail } from "../types/SeatMap";

interface Props {
    seats: SeatDetail[],
    items: ItemDetail[]
    price: {
        itemPrice: number,
        ticketPrice: number
    }
}

function ConfirmTicket(props: Props) {
    return (
        <div className="w-90">
            <p className="text-2xl font-semibold">Confirm your purchase</p>
            <div className="mt-2 border-2 border-gray-400 p-2 rounded-lg">
                <p><span className="font-semibold">Seats: </span>{props.seats.map(e=>e.label).join(', ')}</p>
                <div><span className="font-semibold">Items: </span>{props.items.map(e => {
                    return <p key={e.item._id} className="ml-8">{e.item.name} x {e.quantity}</p>
                })}</div>
                <p><span className="font-semibold">Total: </span>{(props.price.itemPrice + props.price.ticketPrice).toLocaleString('vi-VI', {style: 'currency', currency: 'VND'})}</p>    
            </div>
            <Radio.Group value='vnpay' className="mt-2" label="Payment Method" name="payment">
                <div className="flex flex-col gap-3 mt-3">
                    <Radio value="vnpay" label="VNPay"/> 
                </div>
            </Radio.Group>
        </div>
    )
}

export default ConfirmTicket;