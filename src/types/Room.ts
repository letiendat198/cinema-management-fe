interface Room {
    _id: string,
    cinemaId: string,
    roomNumber: number,
    maxRow: number,
    maxColumn: number,
}

function isRoom(object: any): object is Room {
    return 'roomNumber' in object;
}

export {type Room, isRoom}

