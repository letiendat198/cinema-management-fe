import { ActionIcon, Button, Modal, Select } from "@mantine/core";
import { Room } from "../../../types/Room";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useEffect, useRef, useState } from "react";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { IconPencilMinus, IconTrash } from "@tabler/icons-react";
import { deleteRoom, getRoomsByCinemaId } from "../../../api/RoomAPI";
import { notifications } from "@mantine/notifications";
import RoomForm from "./RoomForm";
import { Cinema } from "../../../types/Cinema";

interface Props {
    cinemaData: Cinema[] | undefined,
    refreshToggle: () => void
}

function ManageRoom(props: Props) {
    const [data, setData] = useState<Room[]>();
    const [selectedCinemaId, setSelectedCinemaId] = useState<string | null>();
    const [selectedRecords, setSelectedRecords] = useState<Room[]>([]);
    const [addOpened, {open: addOpen, close: addClose}] = useDisclosure(false);
    const [editOpened, {open: editOpen, close: editClose}] = useDisclosure(false);
    const [deleteOpened, {open: deleteOpen, close: deleteClose}] = useDisclosure(false);
    const selectedRoom = useRef<Room>(undefined);

    const deleteCallback = () => {
        if (selectedRoom.current) deleteRoom(selectedRoom.current?._id)
            .then(message => {
                console.log(message)
                notifications.show({
                    title: 'Delete room',
                    message: message,
                });
                props.refreshToggle();
            })
    }

    const columns: DataTableColumn<Room>[] = [
        {
            accessor: 'roomNumber'
        },
        {
            accessor: 'maxRow'
        },
        {
            accessor: 'maxColumn'
        },
        {
            accessor: 'action',
            render: (data, index) => {
                return <div className="flex gap-2">
                    <ActionIcon bg='yellow' onClick={() => {
                        selectedRoom.current = data;
                        editOpen();
                    }}>
                        <IconPencilMinus />
                    </ActionIcon>
                    <ActionIcon bg={'red'} onClick={() => {
                        selectedRoom.current = data;
                        deleteOpen();
                    }}>
                        <IconTrash />
                    </ActionIcon>
                </div>
            }
        }
    ]

    useEffect(() => {
        if (selectedCinemaId) {
            console.log("Getting room for cinema id", selectedCinemaId);
            getRoomsByCinemaId(selectedCinemaId).then(data => setData(data));    
        } 
    }, [selectedCinemaId])

    return (
        <div className="mt-4">
            <p className="text-3xl font-bold">Manage Room</p>
            <div className="flex mt-2">
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
            </div>
            
            <div className="mt-4"> 
                <Button disabled={!selectedCinemaId} onClick={addOpen}>Add Room</Button>
            </div>
            <div className="mt-4">
                <DataTable 
                        highlightOnHover
                        columns={columns} 
                        records={data} 
                        selectedRecords={selectedRecords} 
                        onSelectedRecordsChange={setSelectedRecords}/>
            </div>
            <Modal opened={addOpened} onClose={addClose} title='Add Room'>
                <RoomForm cinemaId={selectedCinemaId} onSubmit={() => {
                    addClose(),
                    props.refreshToggle()
                }} />
            </Modal>
            <Modal opened={editOpened} onClose={editClose} title='Edit Room'>
                <RoomForm edit data={selectedRoom.current} onSubmit={() => {
                    editClose();
                    props.refreshToggle();
                }} />
            </Modal>
            <Modal opened={deleteOpened} onClose={deleteClose} title='Delete Room' >
                <p>Are you sure you want to delete room: <span className="font-bold">{selectedRoom.current?.roomNumber}</span>?</p>
                <div className="flex gap-2 justify-end mt-2">
                    <Button onClick={deleteClose}>Cancel</Button>
                    <Button onClick={() => {
                        deleteClose();
                        deleteCallback();
                    }}>Confirm</Button>
                </div>
            </Modal>
        </div>
    )
}

export default ManageRoom;