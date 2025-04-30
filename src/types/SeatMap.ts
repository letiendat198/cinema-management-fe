export interface SeatMap {
    _id?: string
    roomID: string,
    valueMap: number[],
    labelMap: string[]
}

export interface SeatDetail {
    index: number,
    label: string
}
