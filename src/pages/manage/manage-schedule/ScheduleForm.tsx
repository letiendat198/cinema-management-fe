import { Button, Select, Textarea, TextInput } from "@mantine/core";
import { Schedule } from "../../../types/Schedule";
import { useForm } from "@mantine/form";
import {notifications} from '@mantine/notifications';
import { DateTimePicker } from '@mantine/dates'; 
import { addSchedule, updateSchedule } from "../../../api/ScheduleAPI";
import { Room } from "../../../types/Room";
import dayjs from "dayjs";

interface Props {
    edit?: boolean,
    data?: Schedule,
    roomData: Room[],
    movieId?: string | null; // Pass separately when add. Included in data when edit
    onSubmit?: () => void
}

function ScheduleForm(props: Props) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: props.data,
        // validate: {
        //     username: (value) => !value ? "Cannot be empty!" : null,
        //     email:  (value) => !value ? "Cannot be empty!" : null,
        //     password:  (value) => (!value && !props.edit) ? "Cannot be empty!" : null,
        // }
    });

    let submitCallback = form.onSubmit((values) => {
        if (!props.edit){
            values.movieID = props.movieId ? props.movieId : ""; // Populate movieId when add
            addSchedule(values)
            .then(message => {
                console.log(message)
                notifications.show({
                    title: 'Add new schedule',
                    message: message,
                })
                if (props.onSubmit) props.onSubmit();
            })    
        } 
        else {
            if (props.data) updateSchedule(props.data._id, values)
                .then(message => {
                    console.log(message)
                    notifications.show({
                        title: 'Edit schedule',
                        message: message,
                    })
                    if (props.onSubmit) props.onSubmit();
                });
        }
    })

    return (
        <form className="flex flex-col gap-2" onSubmit={submitCallback}>
            <div className="grid grid-cols-2 gap-4">
                <Select
                    className="col-span-2"
                    withAsterisk
                    placeholder="Please pick a room"
                    data={props.roomData?.map((room) => {
                        return {
                            value: room._id,
                            label: room.roomNumber.toString()
                        }
                    })} 
                    key={form.key('roomID')}
                    {...form.getInputProps('roomID')}
                />
                <DateTimePicker
                    withAsterisk
                    valueFormat="DD/MM/YYYY HH:mm:ss"
                    label="Start Time"
                    placeholder="Start Time"
                    key={form.key('startTime')}
                    {...form.getInputProps('startTime')}
                />
                <DateTimePicker
                    withAsterisk
                    valueFormat="DD/MM/YYYY HH:mm:ss"
                    label="End Time"
                    placeholder="End Time"
                    key={form.key('endTime')}
                    {...form.getInputProps('endTime')}
                />
            </div>
            <Button className="col-span-3 self-end" type="submit">Submit</Button>
        </form>
    )
}

export default ScheduleForm;