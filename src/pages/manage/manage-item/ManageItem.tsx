import { ActionIcon, Button, Modal } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { IconEdit, IconPencilMinus, IconTrash } from "@tabler/icons-react";
import {DataTable, DataTableColumn} from 'mantine-datatable';
import { useDisclosure, useToggle } from "@mantine/hooks";
import ItemForm from "./ItemForm";
import { notifications } from "@mantine/notifications";
import { Item } from "../../../types/Item";
import { deleteItem, getAllItems } from "../../../api/ItemAPI";
import { useRestrictUser } from "../../../hooks/restrictUser";

function ManageItem() {
    useRestrictUser('admin')
    const [data, setData] = useState<Item[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<Item[]>([]);
    const [addOpened, {open: addOpen, close: addClose}] = useDisclosure(false);
    const [editOpened, {open: editOpen, close: editClose}] = useDisclosure(false);
    const [deleteOpened, {open: deleteOpen, close: deleteClose}] = useDisclosure(false);
    const [refresh, refreshToggle] = useToggle();
    const selectedItem = useRef<Item>(undefined);

    const deleteCallback = () => {
        if (selectedItem.current) deleteItem(selectedItem.current?._id)
            .then(message => {
                    console.log(message)
                    notifications.show({
                        title: 'Delete item',
                        message: message,
                    });
                    refreshToggle();
                })
    }

    const columns: DataTableColumn<Item>[] = [
        {
            accessor: 'Image',
            render: (record, index) => <img className="w-20" src={record.imageUrl} />
        },
        {
            accessor: 'name'
        },
        {
            accessor: 'price',
            render: (record, index) => record.price.toLocaleString('vi-VI', {style: 'currency', currency: 'VND'})
        },
        {
            accessor: 'description',
        },
        {
            accessor: 'action',
            render: (data, index) => {
                return <div className="flex gap-2">
                    <ActionIcon bg='yellow' onClick={() => {
                        selectedItem.current = data;
                        editOpen();
                    }}>
                        <IconPencilMinus />
                    </ActionIcon>
                    <ActionIcon bg={'red'} onClick={() => {
                        selectedItem.current = data;
                        deleteOpen();
                    }}>
                        <IconTrash />
                    </ActionIcon>
                </div>
            }
        }
    ]

    useEffect(() => {
        getAllItems().then(data => setData(data));
    }, [refresh]) 

    return (
        <div>
            <p className="text-3xl font-bold">Manage Item</p>
            <div className="mt-4"> 
                <Button onClick={addOpen}>Add Item</Button>
            </div>
            <div className="mt-4">
                <DataTable 
                        idAccessor='_id'
                        highlightOnHover
                        columns={columns} 
                        records={data} 
                        selectedRecords={selectedRecords} 
                        onSelectedRecordsChange={setSelectedRecords}/>
            </div>
            <Modal opened={addOpened} onClose={addClose} title='Add Item'>
                <ItemForm onSubmit={() => {
                    addClose(),
                    refreshToggle()
                }} />
            </Modal>
            <Modal opened={editOpened} onClose={editClose} title='Edit Item'>
                <ItemForm edit data={selectedItem.current}  onSubmit={() => {
                    editClose();
                    refreshToggle();
                }} />
            </Modal>
            <Modal opened={deleteOpened} onClose={deleteClose} title='Delete Item' >
                <p>Are you sure you want to delete item: <span className="font-bold">{selectedItem.current?.name}</span>?</p>
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

export default ManageItem;