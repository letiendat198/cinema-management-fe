import { ActionIcon, Button, Modal } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { User } from "../../../types/User";
import { deleteUser, getAllUser } from "../../../api/UserAPI";
import { IconEdit, IconPencilMinus, IconTrash } from "@tabler/icons-react";
import {DataTable, DataTableColumn} from 'mantine-datatable';
import { useDisclosure, useToggle } from "@mantine/hooks";
import UserForm from "./UserForm";
import { notifications } from "@mantine/notifications";

function ManageUser() {
    const [data, setData] = useState<User[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<User[]>([]);
    const [addOpened, {open: addOpen, close: addClose}] = useDisclosure(false);
    const [editOpened, {open: editOpen, close: editClose}] = useDisclosure(false);
    const [deleteOpened, {open: deleteOpen, close: deleteClose}] = useDisclosure(false);
    const [refresh, refreshToggle] = useToggle();
    const selectedUser = useRef<User>(undefined);

    const deleteUserCallback = () => {
        if (selectedUser.current) deleteUser(selectedUser.current?._id)
            .then(message => {
                    console.log(message)
                    notifications.show({
                        title: 'Delete user',
                        message: message,
                    });
                    refreshToggle();
                })
    }

    const columns: DataTableColumn<User>[] = [
        {
            accessor: 'username'
        },
        {
            accessor: 'email'
        },
        {
            accessor: 'role'
        },
        {
            accessor: 'action',
            render: (data, index) => {
                return <div className="flex gap-2">
                    <ActionIcon bg='yellow' onClick={() => {
                        selectedUser.current = data;
                        editOpen();
                    }}>
                        <IconPencilMinus />
                    </ActionIcon>
                    <ActionIcon bg={'red'} onClick={() => {
                        selectedUser.current = data;
                        deleteOpen();
                    }}>
                        <IconTrash />
                    </ActionIcon>
                </div>
            }
        }
    ]

    useEffect(() => {
        getAllUser().then(users => setData(users));
    }, [refresh]) 

    return (
        <div className="px-20 mt-2">
            <p className="text-3xl font-bold">Manage User</p>
            <div className="mt-4"> 
                <Button onClick={addOpen}>Add User</Button>
            </div>
            <div className="mt-4">
                <DataTable 
                        highlightOnHover
                        columns={columns} 
                        records={data} 
                        selectedRecords={selectedRecords} 
                        onSelectedRecordsChange={setSelectedRecords}/>
            </div>
            <Modal opened={addOpened} onClose={addClose} title='Add User'>
                <UserForm onSubmit={() => {
                    addClose(),
                    refreshToggle()
                }} />
            </Modal>
            <Modal opened={editOpened} onClose={editClose} title='Edit User'>
                <UserForm edit data={selectedUser.current}  onSubmit={() => {
                    editClose();
                    refreshToggle();
                }} />
            </Modal>
            <Modal opened={deleteOpened} onClose={deleteClose} title='Delete User' >
                <p>Are you sure you want to delete user: <span className="font-bold">{selectedUser.current?.username}</span>?</p>
                <div className="flex gap-2 justify-end mt-2">
                    <Button onClick={deleteClose}>Cancel</Button>
                    <Button onClick={() => {
                        deleteClose();
                        deleteUserCallback();
                    }}>Confirm</Button>
                </div>
            </Modal>
        </div>
    )
}

export default ManageUser;