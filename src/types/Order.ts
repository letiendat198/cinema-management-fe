import { Item } from "./Item"
import { Movie } from "./Movie"
import { Room } from "./Room"
import { Schedule } from "./Schedule"

export interface OrderTemp { // Info needed to create a new order
    userID: string,
    complementItems: {
        item: string,
        quantity: number
    }[],
    seatsIndex: number[],
    showtime: string
}

export interface Order {
    _id: string,
    userID: string,
    complementItems: {
        item: Item,
        quantity: number
    }[],
    tickets: string[],
    showtime: {
        _id: string,
        movieID: Movie, // In-consistent warning
        roomID:  Room,
        startTime: Date,
        endTime: Date 
    },
    totalPrice: number,
    status: string,
    _tempSeats: number[],
    seatsLabel: string[]
}