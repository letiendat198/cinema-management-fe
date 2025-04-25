
interface ItemDetail {
    item: string,
    quantity: number
}

interface Props {
    seats: string[],
    items: ItemDetail[]
}

function ConfirmTicket(props: Props) {
    return (
        <div className="w-90">
            {/* <p className="text-2xl font-semibold">Confirm your purchase</p>
            <p>Seats: {props.seats.join(', ')}</p> */}
        </div>
    )
}

export default ConfirmTicket;