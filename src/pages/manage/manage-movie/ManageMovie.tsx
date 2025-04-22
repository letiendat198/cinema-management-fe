import { ActionIcon, Button, Modal } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { IconEdit, IconPencilMinus, IconTrash } from "@tabler/icons-react";
import {DataTable, DataTableColumn} from 'mantine-datatable';
import { useDisclosure, useToggle } from "@mantine/hooks";
import MovieForm from "./MovieForm";
import { notifications } from "@mantine/notifications";
import { Movie } from "../../../types/Movie";
import { deleteMovie, getAllMovies } from "../../../api/MovieAPI";
import { useRestrictUser } from "../../../hooks/restrictUser";

function ManageMovie() {
    useRestrictUser('admin')
    const [data, setData] = useState<Movie[]>([]);
    const [selectedRecords, setSelectedRecords] = useState<Movie[]>([]);
    const [addOpened, {open: addOpen, close: addClose}] = useDisclosure(false);
    const [editOpened, {open: editOpen, close: editClose}] = useDisclosure(false);
    const [deleteOpened, {open: deleteOpen, close: deleteClose}] = useDisclosure(false);
    const [refresh, refreshToggle] = useToggle();
    const selectedMovie = useRef<Movie>(undefined);

    const deleteCallback = () => {
        if (selectedMovie.current) deleteMovie(selectedMovie.current?._id)
            .then(message => {
                    console.log(message)
                    notifications.show({
                        title: 'Delete movie',
                        message: message,
                    });
                    refreshToggle();
                })
    }

    const columns: DataTableColumn<Movie>[] = [
        {
            accessor: 'Image',
            render: (record, index) => <img className="w-30 aspect-2/3" src={record.img} />
        },
        {
            accessor: 'title'
        },
        {
            accessor: 'description',
            width: 300
        },
        {
            accessor: 'director'
        },
        {
            accessor: 'moviestars',
            render: (record, index) => <p>{record.moviestars.join(", ")}</p>
        },
        {
            accessor: 'genre'
        },
        {
            accessor: 'length'
        },
        {
            accessor: 'language'
        },
        {
            accessor: 'year'
        },
        {
            accessor: 'action',
            render: (data, index) => {
                return <div className="flex gap-2">
                    <ActionIcon bg='yellow' onClick={() => {
                        selectedMovie.current = data;
                        editOpen();
                    }}>
                        <IconPencilMinus />
                    </ActionIcon>
                    <ActionIcon bg={'red'} onClick={() => {
                        selectedMovie.current = data;
                        deleteOpen();
                    }}>
                        <IconTrash />
                    </ActionIcon>
                </div>
            }
        }
    ]

    useEffect(() => {
        getAllMovies().then(data => setData(data));
    }, [refresh]) 

    return (
        <div>
            <p className="text-3xl font-bold">Manage Movie</p>
            <div className="mt-4"> 
                <Button onClick={addOpen}>Add Movie</Button>
            </div>
            <div className="mt-4">
                <DataTable 
                        highlightOnHover
                        columns={columns} 
                        records={data} 
                        selectedRecords={selectedRecords} 
                        onSelectedRecordsChange={setSelectedRecords}/>
            </div>
            <Modal size='lg' opened={addOpened} onClose={addClose} title='Add Movie'>
                <MovieForm onSubmit={() => {
                    addClose(),
                    refreshToggle()
                }} />
            </Modal>
            <Modal size='lg' opened={editOpened} onClose={editClose} title='Edit Movie'>
                <MovieForm edit data={selectedMovie.current}  onSubmit={() => {
                    editClose();
                    refreshToggle();
                }} />
            </Modal>
            <Modal opened={deleteOpened} onClose={deleteClose} title='Delete Movie' >
                <p>Are you sure you want to delete movie: <span className="font-bold">{selectedMovie.current?.title}</span>?</p>
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

export default ManageMovie;