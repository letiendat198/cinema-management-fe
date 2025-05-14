import { Button, Stepper } from "@mantine/core";
import { useRef, useState } from "react";
import TicketSelect from "./TicketSelect";
import { Schedule } from "../../types/Schedule";
import { Movie } from "../../types/Movie";
import { useRestrictUser } from "../../hooks/restrictUser";
import ItemSelect from "./ItemSelect";
import { Item, ItemDetail } from "../../types/Item";
import ConfirmTicket from "./ConfirmTicket";
import { SeatDetail } from "../../types/SeatMap";
import { addOrder } from "../../api/OrderAPI";
import { useUserStore } from "../../hooks/userStore";
import { notifications } from "@mantine/notifications";
import { getPaymentUrlForOrder } from "../../api/PaymentAPI";

interface Props {
    schedule: Schedule,
    onClose: () => void;
}

interface Price {
    itemPrice: number,
    ticketPrice: number
}

function TicketPurchase(props: Props) {
    useRestrictUser('user');
    const [ticketStep, setTicketStep] = useState<number>(0);
    const [selectedSeats, setSelectedSeats] = useState<SeatDetail[]>([]);
    const [selectedItems, setSelectedItems] = useState<ItemDetail[]>([]);
    const [price, setPrice] = useState<Price>({itemPrice: 0, ticketPrice: 0});

    const itemsData = useRef<{item: string, quantity: number}[]>([]);
    const userId = useUserStore(state => state.user)?._id;

    const onSelectedSeatChange = (seats: SeatDetail[], newPrice: number) => {
        console.log(seats)
        setSelectedSeats(seats);
        setPrice(oldPrice => ({...oldPrice, ticketPrice: newPrice}))
    }

    const onSelectedItemChange = (itemMap: Map<Item, number>) => {
        let items: ItemDetail[] = [];
        let itemPrice = 0;
        itemMap.forEach((value, key) => {
            if (value == 0) return;
            items.push({
                item: key,
                quantity: value
            });
            itemsData.current.push({item: key._id, quantity: value})
            itemPrice += key.price * value;
        });
        setSelectedItems(items);
        setPrice(oldPrice => ({...oldPrice, itemPrice: itemPrice}));
    }

    const submitOrder = () => {
        addOrder({
            userID: userId ? userId : "No user ID",
            complementItems: itemsData.current,
            seatsIndex: selectedSeats.map(e => e.index),
            showtime: props.schedule._id
        }).then(data => {
            notifications.show({
                title: 'Create new order',
                message: 'New order created successfully',
            });

            getPaymentUrlForOrder(data._id).then(url => {
                const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
                if (newWindow) newWindow.opener = null;
                props.onClose();
            })
        }).catch(error => {
            notifications.show({
                title: 'Create new order',
                message: error,
            });
        })
    }

    return (
        <div>
            <Stepper active={ticketStep} orientation="vertical" classNames={{root: "flex gap-4"}}>
                <Stepper.Step label="Select seats" description="Choose your seats">
                    <TicketSelect schedule={props.schedule} onSeatChange={onSelectedSeatChange} />
                </Stepper.Step>
                <Stepper.Step label="Complementary items" description="Popcorns, drinks, souvenirs,...">
                    <ItemSelect onItemChange={onSelectedItemChange} />
                </Stepper.Step>
                <Stepper.Step label="Pay" description="Complete your purchase">
                    <ConfirmTicket seats={selectedSeats} items={selectedItems} price={price} />
                </Stepper.Step>
                {/* Stepper may pass its custom props to div, which result in errors in console. Ignore!*/}
                <div className="mt-auto">
                    <div className="flex gap-3">
                        {ticketStep > 0 ? <Button onClick={() => setTicketStep(step => step-1)}>Back</Button> : <></>}
                        <Button disabled={selectedSeats.length == 0} onClick={() => {
                            if (ticketStep < 2) setTicketStep(step => step+1);
                            else submitOrder();  
                        }}>{ticketStep < 2 ? "Next" : "Confirm"}</Button>
                    </div>
                </div>
            </Stepper>
        </div>
    )
}

export default TicketPurchase;