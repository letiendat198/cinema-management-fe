import { Button, Stepper } from "@mantine/core";
import { useState } from "react";
import TicketSelect from "./TicketSelect";
import { Schedule } from "../types/Schedule";
import { Movie } from "../types/Movie";

interface Props {
    schedule: Schedule,
}

function TicketPurchase(props: Props) {
    const [ticketStep, setTicketStep] = useState<number>(0);

    return (
        <div>
            <Stepper active={ticketStep} orientation="vertical" classNames={{root: "flex gap-4"}}>
                <Stepper.Step label="Select seats" description="Choose your seats">
                    <TicketSelect schedule={props.schedule} />
                </Stepper.Step>
                <Stepper.Step label="Complementary items" description="Popcorns, drinks, souvenirs,...">

                </Stepper.Step>
                <Stepper.Step label="Pay" description="Complete your purchase">
                    
                </Stepper.Step>
                <div className="flex gap-3 mt-auto">
                    {ticketStep > 0 ? <Button onClick={() => setTicketStep(step => step-1)}>Back</Button> : <></>}
                    <Button onClick={() => setTicketStep(step => step+1)}>Next</Button>
                </div>
            </Stepper>
        </div>
    )
}

export default TicketPurchase;