import { ActionIcon, Button, Modal, Select } from "@mantine/core";
import { Schedule } from "../../../types/Schedule";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { useEffect, useRef, useState } from "react";
import { useDisclosure, useToggle } from "@mantine/hooks";
import { IconPencilMinus, IconTrash } from "@tabler/icons-react";
import { deleteSchedule, getSchedulesByMovieId } from "../../../api/ScheduleAPI";
import { notifications } from "@mantine/notifications";
import ScheduleForm from "./ScheduleForm";
import { Cinema, isCinema } from "../../../types/Cinema";
import { Movie } from "../../../types/Movie";
import { getAllMovies } from "../../../api/MovieAPI";
import { getAllCinemas } from "../../../api/CinemaAPI";
import { isRoom, Room } from "../../../types/Room";
import { getRoomsByCinemaId } from "../../../api/RoomAPI";
import dayjs from 'dayjs';
import { useRestrictUser } from "../../../hooks/restrictUser";

function ManageSchedule() {
    useRestrictUser('admin')

    const [data, setData] = useState<Schedule[]>([]); // Data for table
    const [scheduleData, setScheduleData] = useState<Schedule[]>([]); // Raw data 
    const [selectedRecords, setSelectedRecords] = useState<Schedule[]>([]);
    const [addOpened, {open: addOpen, close: addClose}] = useDisclosure(false);
    const [editOpened, {open: editOpen, close: editClose}] = useDisclosure(false);
    const [deleteOpened, {open: deleteOpen, close: deleteClose}] = useDisclosure(false);
    const [refresh, refreshToggle] = useToggle();
    const selectedSchedule = useRef<Schedule>(undefined);
    const [movieData, setMovieData] = useState<Movie[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<string | null>("");
    const [cinemaData, setCinemaData] = useState<Cinema[]>([]);
    const [selectedCinemaId, setSelectedCinemaId] = useState<string | null>("");
    const [roomData, setRoomData] = useState<Room[]>([]);

    const deleteCallback = () => {
        if (selectedSchedule.current) deleteSchedule(selectedSchedule.current?._id)
            .then(message => {
                console.log(message)
                notifications.show({
                    title: 'Delete schedule',
                    message: message,
                });
                refreshToggle();
            })
    }

    const columns: DataTableColumn<Schedule>[] = [
        {
            accessor: 'roomID.roomNumber',
            title: 'Room number'
        },
        {
            accessor: 'startTime',
            render: (record) => dayjs(record.startTime).format('DD/MM/YYYY HH:mm:ss')
        },
        {
            accessor: 'endTime',
            render: (record) => dayjs(record.endTime).format('DD/MM/YYYY HH:mm:ss')
        },
        {
            accessor: 'action',
            render: (data, index) => {
                return <div className="flex gap-2">
                    <ActionIcon bg='yellow' onClick={() => {
                        selectedSchedule.current = data;
                        editOpen();
                    }}>
                        <IconPencilMinus />
                    </ActionIcon>
                    <ActionIcon bg={'red'} onClick={() => {
                        selectedSchedule.current = data;
                        deleteOpen();
                    }}>
                        <IconTrash />
                    </ActionIcon>
                </div>
            }
        }
    ]

    // Load movies and cinemas on load
    useEffect(() => {
        getAllMovies().then(data => setMovieData(data));
    }, [])

    useEffect(() => {
        getAllCinemas().then(data => setCinemaData(data));
    }, [])

    // Load rooms when select a cinema to serve add, edit
    useEffect(() => {
        if (selectedCinemaId) getRoomsByCinemaId(selectedCinemaId).then(data => setRoomData(data)); 
        else setRoomData([]);
    }, [selectedCinemaId])

    // Load schedules
    useEffect(() => {
        if (selectedMovieId) {
            getSchedulesByMovieId(selectedMovieId).then(data => {
                // Data's startTime and endTime didn't cast to Date as in interface declaration, TS is weird
                // Force a cast here to work with Mantine's DateTimePicker
                data = data.map(schedule => {
                    schedule.startTime = new Date(schedule.startTime);
                    schedule.endTime = new Date(schedule.endTime);
                    return schedule;
                })
                setScheduleData(data);
            });    
        } 
        else setScheduleData([]);
    }, [selectedMovieId, refresh])

    // Filter schedule
    useEffect(() => {
        if (scheduleData.length > 0) {
            let filteredData = scheduleData.filter(e => {
                if (isRoom(e.roomID) && isCinema(e.roomID.cinemaID)) return e.roomID.cinemaID._id == selectedCinemaId;
            });
            console.log(filteredData);
            setData(filteredData);
        }
        else setData([]);
    }, [scheduleData, selectedCinemaId])

    return (
        <div className="mt-4">
            <p className="text-3xl font-bold">Manage Schedule</p>
            <div className="flex gap-3 mt-2">
                <Select className="self-start" 
                    placeholder="Please pick a movie"
                    data={movieData?.map((movie) => {
                        return {
                            value: movie._id,
                            label: movie.title
                        }
                    })} 
                    value={selectedMovieId} 
                    onChange={setSelectedMovieId} />    
                <Select className="self-start" 
                    placeholder="Please pick a cinema"
                    data={cinemaData?.map((cinema) => {
                        return {
                            value: cinema._id,
                            label: cinema.name
                        }
                    })} 
                    value={selectedCinemaId} 
                    onChange={setSelectedCinemaId} />   
            </div>
            
            <div className="mt-4"> 
                <Button disabled={!selectedCinemaId || !selectedMovieId} onClick={addOpen}>Add Schedule</Button>
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
            <Modal opened={addOpened} onClose={addClose} title='Add Schedule'>
                <ScheduleForm roomData={roomData} movieId={selectedMovieId} onSubmit={() => {
                    addClose(),
                    refreshToggle()
                }} />
            </Modal>
            <Modal opened={editOpened} onClose={editClose} title='Edit Schedule'>
                <ScheduleForm edit data={selectedSchedule.current} roomData={roomData} onSubmit={() => {
                    editClose();
                    refreshToggle();
                }} />
            </Modal>
            <Modal opened={deleteOpened} onClose={deleteClose} title='Delete Schedule' >
                <p>Are you sure you want to delete schedule: <span className="font-bold">{}</span>?</p>
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

export default ManageSchedule;