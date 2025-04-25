import { useEffect, useRef, useState } from "react";
import { Schedule } from "../types/Schedule";
import SeatMap from "./SeatMap";
import { isRoom, Room } from "../types/Room";
import { getRoomById } from "../api/RoomAPI";
import { Seat } from "../types/Seat";
import { SeatType } from "../types/SeatType";
import { getAllSeatTypes } from "../api/SeatTypeAPI";
import { getSeatMapByRoomId } from "../api/SeatAPI";
import { Movie } from "../types/Movie";

interface Props {
    schedule: Schedule,
    onSeatChange: (newSeats: string[]) => void
}

function TicketSelect(props: Props) {
    const [roomData, setRoomData] = useState<Room>(); // For max row and column
    const [seatData, setSeatData] = useState<Seat>(); // Seat map
    const [seatTypeData, setSeatTypeData] = useState<SeatType[]>();
    const [colorMap, setColorMap] = useState<Map<number, string>>(new Map());

    const [valueData, setValueData] = useState<number[]>([]); // For easier modification of selected seat value
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const selectingValue = useRef<number>(10); // Value to set a selected seat

    const onCellSelect = (index: number, value: number, isSelected: boolean) => {
        setValueData(valueData.map((e,i) => {
            let originalValue = seatData ? seatData.seatMap[index] : 0
            if (i == index) {
                return isSelected ? selectingValue.current : originalValue;
            }
            return e;
        })); // Change color

        let seatPrice = seatTypeData?.find(e => e.value == seatData?.seatMap[index])?.price // Maybe should make this a map
        seatPrice = seatPrice ? seatPrice : 0;

        if (isSelected) {
            setSelectedSeats([...selectedSeats, index]);    
            setTotalPrice(price => price + seatPrice);
        }
        else {
            setSelectedSeats([...selectedSeats].filter(e => e != index));
            setTotalPrice(price => price - seatPrice);
        } 
    }

    useEffect(() => {
        if (seatData) props.onSeatChange(selectedSeats.map(seatIndex => seatData.labelMap[seatIndex]));
    }, selectedSeats)

    useEffect(() => {
        let roomId = ""
        if (isRoom(props.schedule.roomID)) roomId = props.schedule.roomID._id;
        else roomId = props.schedule.roomID;

        getRoomById(roomId).then(data => setRoomData(data));

        getSeatMapByRoomId(roomId).then(data => {
            if (data.length > 0){
                setSeatData(data[0]);    
                setValueData(data[0].seatMap);
            } 
        })
    }, [])

    useEffect(() => {
        getAllSeatTypes().then(data => {
            setSeatTypeData(data);

            let map = new Map<number,string>();
            data.forEach(e => {
                map.set(e.value, e.color);
                if (e.label=="Selecting") selectingValue.current = e.value; // Might run into problem if label changes
            })

            setColorMap(map);
        })
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
                    {(roomData!=undefined && seatData!=undefined) ? <SeatMap maxColumn={roomData.maxColumn} 
                            maxRow={roomData.maxRow}
                            colorMap={colorMap}
                            valueData={valueData}
                            labelData={seatData.labelMap}
                            onCellSelect={onCellSelect}/> : <p>Invalid room</p>}
                </div>    
                <div className=" mt-2 flex flex-col">
                    <p><span className="font-bold">Seat selected: </span>{selectedSeats.map(e => seatData?.labelMap[e]).join(', ')}</p>
                    <p><span className="font-bold">Total price: </span> {totalPrice.toLocaleString('vi-VI', {style: 'currency', currency: 'VND'})}</p>
                </div>
            </div>
        </div>
    )
}

export default TicketSelect;