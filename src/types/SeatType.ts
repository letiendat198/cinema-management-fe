export interface SeatType {
    _id: string,
    label: string,
    color: string,
    price: number,
    value: number
}

export function isSeatType(object: any): object is SeatType {
    try {
        return 'label' in object;    
    }
    catch {
        return false;
    }
}