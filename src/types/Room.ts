import { Cinema } from "./Cinema";

interface Room {
    _id: string,
    cinemaID: string | Cinema,
    roomNumber: number,
    maxRow: number,
    maxColumn: number,
}

function isRoom(object: any): object is Room {
    try {
        return 'roomNumber' in object;    
    }
    catch {
        console.log('Failed type guard for object: ', object);
        return false; 
    } 
}

export {type Room, isRoom}

