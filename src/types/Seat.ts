import { SeatType } from "./SeatType";

export interface Seat {
    _id: string,
    roomID: string,
    seatType: SeatType | string,
    seatNumber: number,
    row: number,
    column: number,
    label: string
}