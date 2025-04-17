import { ActionIcon, Button, Modal } from "@mantine/core";
import { Cinema } from "../../../types/Cinema";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useRef, useState } from "react";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { IconPencilMinus, IconTrash } from "@tabler/icons-react";
import { deleteCinema } from "../../../api/CinemaAPI";
import { notifications } from "@mantine/notifications";
import CinemaForm from "./CinemaForm";

interface Props {
    data: Cinema[] | undefined,
    refreshToggle: () => void
}

function ManageCinema(props: Props) {
    const [selectedRecords, setSelectedRecords] = useState<Cinema[]>([]);
    const [addOpened, {open: addOpen, close: addClose}] = useDisclosure(false);
    const [editOpened, {open: editOpen, close: editClose}] = useDisclosure(false);
    const [deleteOpened, {open: deleteOpen, close: deleteClose}] = useDisclosure(false);
    const selectedCinema = useRef<Cinema>(undefined);

    const deleteCallback = () => {
        if (selectedCinema.current) deleteCinema(selectedCinema.current?._id)
            .then(message => {
                console.log(message)
                notifications.show({
                    title: 'Delete cinema',
                    message: message,
                });
                props.refreshToggle();
            })
    }

    const columns: DataTableColumn<Cinema>[] = [
        {
            accessor: 'name'
        },
        {
            accessor: 'location'
        },
        {
            accessor: 'action',
            render: (data, index) => {
                return <div className="flex gap-2">
                    <ActionIcon bg='yellow' onClick={() => {
                        selectedCinema.current = data;
                        editOpen();
                    }}>
                        <IconPencilMinus />
                    </ActionIcon>
                    <ActionIcon bg={'red'} onClick={() => {
                        selectedCinema.current = data;
                        deleteOpen();
                    }}>
                        <IconTrash />
                    </ActionIcon>
                </div>
            }
        }
    ]

    return (
        <div className="mt-4">
            <p className="text-3xl font-bold">Manage Cinema</p>
            <div className="mt-4"> 
                <Button onClick={addOpen}>Add Cinema</Button>
            </div>
            <div className="mt-4">
                <DataTable 
                        highlightOnHover
                        columns={columns} 
                        records={props.data} 
                        selectedRecords={selectedRecords} 
                        onSelectedRecordsChange={setSelectedRecords}/>
            </div>
            <Modal opened={addOpened} onClose={addClose} title='Add Cinema'>
                <CinemaForm onSubmit={() => {
                    addClose(),
                    props.refreshToggle()
                }} />
            </Modal>
            <Modal opened={editOpened} onClose={editClose} title='Edit Cinema'>
                <CinemaForm edit data={selectedCinema.current}  onSubmit={() => {
                    editClose();
                    props.refreshToggle();
                }} />
            </Modal>
            <Modal opened={deleteOpened} onClose={deleteClose} title='Delete Cinema' >
                <p>Are you sure you want to delete cinema: <span className="font-bold">{selectedCinema.current?.name}</span>?</p>
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

export default ManageCinema;