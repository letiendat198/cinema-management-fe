import { Button, Select } from "@mantine/core";
import { Cinema } from "../../../types/Cinema";
import SeatSelector from "../../../components/SeatSelector";
import { useEffect, useRef, useState } from "react";
import { Room } from "../../../types/Room";
import { getRoomsByCinemaId } from "../../../api/RoomAPI";
import { getAllSeatTypes } from "../../../api/SeatTypeAPI";
import { isSeatType, SeatType } from "../../../types/SeatType";
import { notifications } from "@mantine/notifications";
import { Seat } from "../../../types/Seat";
import { createSeatForRoom, getSeatsByRoomId, updateSeats } from "../../../api/SeatAPI";

interface Props {
    cinemaData: Cinema[];
}

function ManageSeat(props: Props) {
    const [roomData, setRoomData] = useState<Room[]>([]);
    const [seatsData, setSeatsData] = useState<Seat[]>([]);
    const [seatTypeData, setSeatTypeData] = useState<SeatType[]>([]);

    const [selectedCinemaId, setSelectedCinemaId] = useState<string | null>();
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>();
    const [selectedRoom, setSelectedRoom] = useState<Room | null>();
    const [selectedSeatType, setSelectedSeatType] = useState<SeatType>();

    const updatedSeats = useRef<Seat[]>([]);

    const onCellSelect = (index: number, value: number, isSelected: boolean) => {
        if (!selectedSeatType) return;
        let newSeat = seatsData[index];
        newSeat.seatType = selectedSeatType;
        setSeatsData(seatsData.map((v,i) => {
            if (i != index) return v;
            else return newSeat;
        }));

        updatedSeats.current.push(newSeat);
    }   

    const onSubmit = () => {
        if (!selectedRoom) return;
        
        let payload = updatedSeats.current.map(e => {
            if (isSeatType(e.seatType)) e.seatType = e.seatType._id;
            return e;
        })

        updateSeats(payload).then(message => {
            notifications.show({
                title: 'Update Seat',
                message: message,
            });
        })
    }

    useEffect(() => {
        if (!selectedRoom) return;
        createSeatForRoom(selectedRoom._id).then(message => { // Make sure seats are already created
            getSeatsByRoomId(selectedRoom._id).then(data => setSeatsData(data));    
        })
    }, [selectedRoom])

    // Get rooms of a cinema
    useEffect(() => {
        if (selectedCinemaId) getRoomsByCinemaId(selectedCinemaId).then(data => setRoomData(data));
        setSelectedRoomId(null);
        setSelectedRoom(null);
    }, [selectedCinemaId])

    // Get seat types
    useEffect(() => {
        getAllSeatTypes().then(data => {
            setSeatTypeData(data);
        })
    }, [])

    return (
        <div className="mt-4">
            <p className="font-bold text-3xl">Manage Seat</p>
            <div className="flex justify-between items-center">
                <div className="flex mt-2 gap-3">
                    <Select className="self-start" 
                        placeholder="Please pick a cinema"
                        data={props.cinemaData?.map((cinema) => {
                            return {
                                value: cinema._id,
                                label: cinema.name
                            }
                        })} 
                        value={selectedCinemaId} 
                        onChange={setSelectedCinemaId} />  
                    <Select className="self-start" 
                    placeholder="Please pick a room"
                    data={roomData?.map((room) => {
                        return {
                            value: room._id,
                            label: room.roomNumber.toString()
                        }
                    })} 
                    value={selectedRoomId} 
                    onChange={(roomId) => {
                        setSelectedRoomId(roomId);
                        setSelectedRoom(roomData?.find((e) => e._id == roomId));
                    }} />  
                </div>
                <Button onClick={onSubmit}>Submit</Button>
            </div>
            
            <div className="flex gap-10 mt-4">
                {seatTypeData.map(e => {
                    return (
                        <div key={e._id} className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-md hover:cursor-pointer" 
                                style={{backgroundColor: e.color}} 
                                onClick={() => setSelectedSeatType(e)}>
                            </div>
                            <p>{e.label}</p>
                        </div>
                    )
                })}
            </div>

            <div className="mt-4 flex justify-center">
                {selectedRoom && seatsData.length && seatsData[0].roomID == selectedRoom._id ? <SeatSelector maxColumn={selectedRoom.maxColumn} 
                        maxRow={selectedRoom.maxRow}
                        seats={seatsData}
                        onCellSelect={onCellSelect} /> : <p className="font-semibold text-xl">Please select a room</p>}
            </div>
        </div>
    )
}

export default ManageSeat;