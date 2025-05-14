import { Movie } from "./Movie";
import { Room } from "./Room";
import { Schedule } from "./Schedule";
import { Seat } from "./Seat";

export interface Ticket {
    _id: string,
    order: string,
    showtime: {
        _id: string,
        movieID: Movie, // In-consistent warning
        roomID:  Room,
        startTime: Date,
        endTime: Date 
    },
    seat: Seat,
    user: string,
    status: string,
    ticketCode: string,
    checkinDate: Date,
}