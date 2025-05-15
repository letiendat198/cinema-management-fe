import { useEffect, useRef, useState } from "react";
import { Schedule } from "../../types/Schedule";
import { isRoom, Room } from "../../types/Room";
import { getRoomById } from "../../api/RoomAPI";
import { SeatMap } from "../../types/SeatMap";
import { isSeatType, SeatType } from "../../types/SeatType";
import { getAllSeatTypes } from "../../api/SeatTypeAPI";
import { getSeatMapByRoomId } from "../../api/SeatMapAPI";
import SeatSelector from "../SeatSelector";
import { getTicketByScheduleId } from "../../api/TicketAPI";
import { Seat } from "../../types/Seat";
import { getSeatsByRoomId } from "../../api/SeatAPI";


interface Props {
    schedule: Schedule,
    onSeatChange: (newSeats: Seat[], newPrice: number) => void
}

function TicketSelect(props: Props) {
    const [roomData, setRoomData] = useState<Room>(); // For max row and column
    const [seatData, setSeatData] = useState<Seat[]>([]); // Seat map
    const [refSeatData, setRefSeatData] = useState<Seat[]>([]); // Ref seat map for original seat type
    const [seatTypeData, setSeatTypeData] = useState<SeatType[]>();

    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0); // For rendering price

    const selectingType = useRef<SeatType>(undefined);

    const onCellSelect = (index: number, value: number, isSelected: boolean) => {
        const updatedSeatData = seatData.map((e,i) => {
            if (i == index) {
                let selectedSeat = {...e}; // COPY THE OBJECT OTHERWISE IT WILL CHANGE BOTH SEATDATA AND REFSEATDATA
                
                if (!selectingType.current) return e;
                if (!isSeatType(selectedSeat.seatType)) return e;
                selectedSeat.seatType = selectingType.current;

                if (isSelected) return selectedSeat;
                else {
                    selectedSeat.seatType = refSeatData[index].seatType;
                    return selectedSeat;
                }
            }
            return e;
        })
        setSeatData(updatedSeatData); // Change color

        // Get the price of selected seats
        if (!isSeatType(refSeatData[index].seatType)) return;
        let seatPrice = refSeatData[index].seatType.price;
        seatPrice = seatPrice ? seatPrice : 0;

        // Add or subtract total price and update seats. State update should be batched and only cause 1 re-render
        if (isSelected) {
            setSelectedSeats([...selectedSeats, refSeatData[index]]);    
            setTotalPrice(price => price + seatPrice);
            // totalPriceRef.current += seatPrice;
        }
        else {
            setSelectedSeats([...selectedSeats].filter((e, i) => e.seatNumber != index));
            setTotalPrice(price => price - seatPrice);
            // totalPriceRef.current -= seatPrice;
        } 
    }

    // Should only run once because React batch the 2 state update
    useEffect(() => {
        if (seatData) props.onSeatChange(selectedSeats, totalPrice);
    }, [selectedSeats, totalPrice])

    // Get room and seat map info
    useEffect(() => {
        let roomId = ""
        if (isRoom(props.schedule.roomID)) roomId = props.schedule.roomID._id;
        else roomId = props.schedule.roomID;

        getRoomById(roomId).then(data => setRoomData(data));

        getSeatsByRoomId(roomId).then(data => {
            setSeatData(data);
            setRefSeatData(data);
        });
    }, [])

    // Get seat types
    useEffect(() => {
        getAllSeatTypes().then(data => {
            setSeatTypeData(data)
            selectingType.current = data.find(e => e.label == "Selecting");
        });
    }, [])

    return (
        <div className="flex gap-10">
            <div className="flex flex-col gap-10">
                {seatTypeData?.map(e => {
                    return (
                        <div key={e._id} className="flex gap-3">
                            <div className="h-8 w-8 rounded-md" 
                                style={{backgroundColor: e.color}}>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs">{e.label}</p>
                                {e.price > 0 ? <p className="text-xs">Price: {e.price.toLocaleString('vi-VI', {style: 'currency', currency: 'VND'})}</p> : <></>}    
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                <div>
                    {(roomData!=undefined && seatData.length) ? <SeatSelector maxColumn={roomData.maxColumn} 
                            maxRow={roomData.maxRow}
                            seats={seatData}
                            onCellSelect={onCellSelect}/> : <p>Invalid room</p>}
                </div>    
                <div className=" mt-2 flex flex-col">
                    <p><span className="font-bold">Seat selected: </span>{selectedSeats.map(e => e.label).join(', ')}</p>
                    <p><span className="font-bold">Total price: </span> {totalPrice.toLocaleString('vi-VI', {style: 'currency', currency: 'VND'})}</p>
                </div>
            </div>
        </div>
    )
}

export default TicketSelect;