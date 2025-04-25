import { Button, Stepper } from "@mantine/core";
import { useState } from "react";
import TicketSelect from "./TicketSelect";
import { Schedule } from "../types/Schedule";
import { Movie } from "../types/Movie";
import { useRestrictUser } from "../hooks/restrictUser";
import ItemSelect from "./ItemSelect";
import { Item } from "../types/Item";
import ConfirmTicket from "./ConfirmTicket";

interface Props {
    schedule: Schedule,
}

interface ItemDetail {
    item: string,
    quantity: number
}

function TicketPurchase(props: Props) {
    useRestrictUser('user');
    const [ticketStep, setTicketStep] = useState<number>(0);
    const [selectedSeatsLabel, setSelectedSeatsLabel] = useState<string[]>([]);
    const [selectedItems, setSelectedItems] = useState<ItemDetail[]>([]);

    const onSelectedSeatChange = (seats: string[]) => {
        setSelectedSeatsLabel(seats);
    }

    const onSelectedItemChange = (itemMap: Map<string, number>) => {
        let items: ItemDetail[] = [];
        itemMap.forEach((value, key) => {
            items.push({
                item: key,
                quantity: value
            });
        });
        setSelectedItems(items);
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
                    <ConfirmTicket seats={selectedSeatsLabel} items={selectedItems} />
                </Stepper.Step>
                {/* Stepper may pass its custom props to div, which result in errors in console. Ignore!*/}
                <div className="flex gap-3 mt-auto">
                    {ticketStep > 0 ? <Button onClick={() => setTicketStep(step => step-1)}>Back</Button> : <></>}
                    <Button onClick={() => setTicketStep(step => step+1)}>Next</Button>
                </div>
            </Stepper>
        </div>
    )
}

export default TicketPurchase;