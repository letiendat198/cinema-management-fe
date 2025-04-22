import { useEffect, useRef, useState } from "react";
import { Schedule } from "../types/Schedule";
import { getSchedulesByMovieId } from "../api/ScheduleAPI";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import { Cinema, isCinema } from "../types/Cinema";
import { isRoom } from "../types/Room";
import { Button, Modal, Stepper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import TicketPurchase from "./TicketPurchase";
import { Movie } from "../types/Movie";

interface Props {
    movie: Movie;
}

function MovieSchedule(props: Props) {
    const [mappedScheduleData, setMappedScheduleData] = useState<Map<string, Schedule[]>>(new Map());
    const [scheduleData, setScheduleDate] = useState<Schedule[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();
    const [ticketOpened, {open: ticketOpen, close: ticketClose}] = useDisclosure(false);
    const modalTitle = useRef<string>("");

    const onScheduleClick = (schedule: Schedule) => {
        if (isRoom(schedule.roomID) && isCinema(schedule.roomID.cinemaID))
            modalTitle.current = [props.movie.title, schedule.roomID.cinemaID.name, "Room " + schedule.roomID.roomNumber, dayjs(schedule.startTime).format("DD/MM HH:mm")].join(" - ");

        setSelectedSchedule(schedule);
        ticketOpen();
    }
    
    useEffect(() => {
        getSchedulesByMovieId(props.movie._id).then(data => setScheduleDate(data));
    }, [])

    // Filter schedule by date
    useEffect(() => {
        console.log(selectedDate);
        let cloneMap = new Map(); // Clone to keep react immutability
        scheduleData.forEach(schedule => { 
            if (!dayjs(schedule.startTime).isSame(selectedDate, 'date')) return;
            if (isRoom(schedule.roomID) && isCinema(schedule.roomID.cinemaID)) { // Type guard
                let CinemaName = schedule.roomID.cinemaID.name;

                if (!cloneMap.has(CinemaName)) cloneMap.set(CinemaName, []);
                cloneMap.get(CinemaName)?.push(schedule);
            }
        })
        setMappedScheduleData(cloneMap);
    }, [selectedDate, scheduleData])

    return (
        <div className="grid grid-cols-3">
            <div className="col-span-2">
                {Array.from(mappedScheduleData.keys()).map((cinemaName, index) => {
                    let schedules = mappedScheduleData.get(cinemaName);
                    return (
                        <div key={index} className="mb-2">
                            <p className="font-bold text-xl">{cinemaName}</p>
                            <div className="flex gap-3 mt-2">
                                {schedules?.map(e => <Button key={e._id} variant="outline" onClick={() => onScheduleClick(e)}>
                                                            {dayjs(e.startTime).format('HH:mm')}
                                                    </Button>)}    
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>
                <Calendar
                    getDayProps={(date) => ({
                        selected: dayjs(date).isSame(selectedDate, 'date'), // For all dates in calendar, use this callback to determine if it's selected
                        onClick: () => setSelectedDate(date),
                    })} />
            </div>
            <Modal size='auto' opened={ticketOpened} onClose={ticketClose} title={modalTitle.current}>
                {selectedSchedule ? <TicketPurchase schedule={selectedSchedule} /> : <></>}
            </Modal>
        </div>
    )
}

export default MovieSchedule;