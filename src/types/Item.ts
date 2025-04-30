export interface Item {
    _id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

export interface ItemDetail {
    item: Item,
    quantity: number
}