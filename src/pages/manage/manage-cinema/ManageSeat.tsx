import { Button, Select } from "@mantine/core";
import { Cinema } from "../../../types/Cinema";
import SeatMap from "../../../components/SeatMap";
import { useEffect, useRef, useState } from "react";
import { Room } from "../../../types/Room";
import { getRoomsByCinemaId } from "../../../api/RoomAPI";
import { getAllSeatTypes } from "../../../api/SeatTypeAPI";
import { SeatType } from "../../../types/SeatType";
import { Seat } from "../../../types/Seat";
import { addSeatMap, getSeatMapByRoomId, updateSeatMap } from "../../../api/SeatAPI";
import { notifications } from "@mantine/notifications";

interface Props {
    cinemaData: Cinema[];
}

function ManageSeat(props: Props) {
    const [roomData, setRoomData] = useState<Room[]>([]);
    const [seatTypeData, setSeatTypeData] = useState<SeatType[]>([]);
    const [colorMap, setColorMap] = useState<Map<number, string>>(new Map());
    const seatMapData = useRef<Seat>(undefined);

    const [selectedCinemaId, setSelectedCinemaId] = useState<string | null>();
    const [selectedRoomId, setSelectedRoomId] = useState<string | null>();
    const [selectedRoom, setSelectedRoom] = useState<Room | null>();
    const [selectedSeatTypeValue, setSelectedSeatTypeValue] = useState<number>(0);

    const [valueData, setValueData] = useState<number[]>([]);
    const [labelData, setLabelData] = useState<string[]>([]);

    const onCellSelect = (index: number, value: number, isSelected: boolean) => {
        setValueData(valueData.map((e,i) => {
            if (i == index) {
                if (value != selectedSeatTypeValue) return selectedSeatTypeValue;
                return isSelected ? selectedSeatTypeValue : 0;
            }
            return e;
        }))
    }   

    const onSubmit = () => {
        if (!selectedRoom) return;
        let data = {
            roomID: selectedRoom?._id,
            seatMap: valueData,
            labelMap: labelData
        }
        console.log(seatMapData.current)
        if (seatMapData.current && seatMapData.current._id) {
            updateSeatMap(seatMapData.current._id, data)
            .then(message => {
                console.log(message)
                notifications.show({
                    title: 'Update seat map',
                    message: message,
                });
            })
        }
        else {
            addSeatMap(data)
            .then(message => {
                console.log(message)
                notifications.show({
                    title: 'Add seat map',
                    message: message,
                });
            })
        }

    }

    // Init value and label arrays for selected room if not existed
    useEffect(() => {
        if (selectedRoom) {
            getSeatMapByRoomId(selectedRoom._id).then(data => {
                if (data.length > 0) {
                    seatMapData.current = data[0];    
                    setValueData(data[0].seatMap);
                    setLabelData(data[0].labelMap);
                } 
                else {
                    seatMapData.current = undefined;
                    setValueData(Array(selectedRoom.maxColumn * selectedRoom.maxRow).fill(0));
                    let label = [];
                    for (let r=0; r<selectedRoom.maxRow; r++) {
                        for (let c=0; c<selectedRoom.maxColumn; c++) {
                            label[r*selectedRoom.maxColumn + c] = String.fromCharCode(r + 65) + c;
                        }
                    }
                    setLabelData(label);
                }
            })
        }

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

            let map = new Map<number,string>();
            data.forEach(e => {
                map.set(e.value, e.color);
            })
            setColorMap(map);
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
                        <div key={e._id} className="flex gap-3">
                            <div className="h-8 w-8 rounded-md hover:cursor-pointer" 
                                style={{backgroundColor: e.color}} 
                                onClick={() => setSelectedSeatTypeValue(e.value)}>
                            </div>
                            <p>{e.label}</p>
                        </div>
                    )
                })}
            </div>

            <div className="mt-4 flex justify-center">
                {selectedRoom ? <SeatMap maxColumn={selectedRoom.maxColumn} 
                        maxRow={selectedRoom.maxRow}
                        colorMap={colorMap}
                        valueData={valueData}
                        labelData={labelData}
                        onCellSelect={onCellSelect} /> : <p className="font-semibold text-xl">Please select a room</p>}
            </div>
        </div>
    )
}

export default ManageSeat;