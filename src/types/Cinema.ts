export interface Cinema {
    _id: string,
    name: string,
    location: string
}

export function isCinema(object: any): object is Cinema {
    return 'location' in object;
}