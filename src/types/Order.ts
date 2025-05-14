import { Item } from "./Item"
import { Movie } from "./Movie"
import { Room } from "./Room"
import { Schedule } from "./Schedule"
import { Seat } from "./Seat"
import { Ticket } from "./Ticket"

export interface OrderTemp { // Info needed to create a new order
    userID: string,
    complementItems: {
        item: string,
        quantity: number
    }[],
    seatsID: string[],
    showtime: string
}

export interface Order {
    _id: string,
    userID: string,
    complementItems: {
        item: Item,
        quantity: number
    }[],
    tickets: Ticket[],
    showtime: {
        _id: string,
        movieID: Movie, // In-consistent warning
        roomID:  Room,
        startTime: Date,
        endTime: Date 
    },
    totalPrice: number,
    status: string,
    _tempSeats: Seat[],
}