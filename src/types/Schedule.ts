import { Room } from "./Room";

export interface Schedule {
    _id: string,
    movieID: string, // In-consistent warning
    roomID: string | Room,
    startTime: Date,
    endTime: Date 
}