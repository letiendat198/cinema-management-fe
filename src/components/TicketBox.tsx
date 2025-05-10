import dayjs from "dayjs";
import { isCinema } from "../types/Cinema";
import { Ticket } from "../types/Ticket";
import { Button } from "@mantine/core";

interface Props {
    ticket: Ticket
}

function TicketBox(props: Props) {
    return (
        <div className="flex gap-4 bprops.ticket-gray-400 bprops.ticket-2 p-4 rounded-lg" key={props.ticket._id}>
            <img className="w-50 aspect-2/3" src={props.ticket.showtime.movieID.img} />
            <div className="flex flex-col gap-2">
                <p className="text-2xl font-semibold">{props.ticket.showtime.movieID.title}</p>
                <p><span className="font-semibold">Location: </span>{isCinema(props.ticket.showtime.roomID.cinemaID) ? props.ticket.showtime.roomID.cinemaID.name + " - " + props.ticket.showtime.roomID.cinemaID.location : ""}</p>
                <p><span className="font-semibold">Time: </span>{dayjs(props.ticket.showtime.startTime).format('HH:mm')} - {dayjs(props.ticket.showtime.endTime).format('HH:mm')}</p> 
                <p><span className="font-semibold">Room {props.ticket.showtime.roomID.roomNumber}:</span> {props.ticket.seatLabel}</p>   
            </div>
        </div>    
    )
}

export default TicketBox;