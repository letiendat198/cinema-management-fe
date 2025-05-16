import { ActionIcon, Button, Modal } from "@mantine/core";
import { SeatType } from "../../../types/SeatType";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useEffect, useRef, useState } from "react";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { IconPencilMinus, IconTrash } from "@tabler/icons-react";
import { deleteSeatType, getAllSeatTypes } from "../../../api/SeatTypeAPI";
import { notifications } from "@mantine/notifications";
import SeatTypeForm from "./SeatTypeForm";

function ManageSeatType() {
    const [seatTypeData, setSeatTypeData] = useState<SeatType[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<SeatType[]>([]);
    const [addOpened, {open: addOpen, close: addClose}] = useDisclosure(false);
    const [editOpened, {open: editOpen, close: editClose}] = useDisclosure(false);
    const [deleteOpened, {open: deleteOpen, close: deleteClose}] = useDisclosure(false);

    const [refresh, refreshToggle] = useToggle();
    const selectedSeatType = useRef<SeatType>(undefined);

    const deleteCallback = () => {
        if (selectedSeatType.current) deleteSeatType(selectedSeatType.current?._id)
            .then(message => {
                console.log(message)
                notifications.show({
                    title: 'Delete Seat Type',
                    message: message,
                });
                refreshToggle();
            })
    }

    const columns: DataTableColumn<SeatType>[] = [
        {
            accessor: 'color',
            render: (data) => <div className="h-8 w-8 rounded-md" style={{backgroundColor: data.color}}></div>
        },
        {
            accessor: 'label'
        },
        {
            accessor: 'price'
        },
        {
            accessor: 'value'
        },
        {
            accessor: 'action',
            render: (data, index) => {
                return <div className="flex gap-2">
                    <ActionIcon bg='yellow' onClick={() => {
                        selectedSeatType.current = data;
                        editOpen();
                    }}>
                        <IconPencilMinus />
                    </ActionIcon>
                    <ActionIcon bg={'red'} onClick={() => {
                        selectedSeatType.current = data;
                        deleteOpen();
                    }}>
                        <IconTrash />
                    </ActionIcon>
                </div>
            }
        }
    ]

    useEffect(() => {
        getAllSeatTypes().then(setSeatTypeData);
    }, [refresh])

    return (
        <div className="mt-4">
            <p className="text-3xl font-bold">Manage Seat Type</p>
            <div className="mt-4"> 
                <Button onClick={addOpen}>Add Seat Type</Button>
            </div>
            <div className="mt-4">
                <DataTable 
                        idAccessor='_id'
                        highlightOnHover
                        columns={columns} 
                        records={seatTypeData} 
                        selectedRecords={selectedRecords} 
                        onSelectedRecordsChange={setSelectedRecords}/>
            </div>
            <Modal opened={addOpened} onClose={addClose} title='Add SeatType'>
                <SeatTypeForm onSubmit={() => {
                    addClose(),
                    refreshToggle()
                }} />
            </Modal>
            <Modal opened={editOpened} onClose={editClose} title='Edit SeatType'>
                <SeatTypeForm edit data={selectedSeatType.current}  onSubmit={() => {
                    editClose();
                    refreshToggle();
                }} />
            </Modal>
            <Modal opened={deleteOpened} onClose={deleteClose} title='Delete SeatType' >
                <p>Are you sure you want to delete seatType: <span className="font-bold">{selectedSeatType.current?.label}</span>?</p>
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

export default ManageSeatType;