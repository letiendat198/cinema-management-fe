import { Button, Textarea, TextInput } from "@mantine/core";
import { Room } from "../../../types/Room";
import { useForm } from "@mantine/form";
import {notifications} from '@mantine/notifications';
import { addRoom, updateRoom } from "../../../api/RoomAPI";

interface Props {
    edit?: boolean,
    data?: Room,
    cinemaId?: string | null | undefined,
    onSubmit?: () => void
}

function RoomForm(props: Props) {
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
            if (props.cinemaId) values.cinemaID = props.cinemaId; // Populate cinema id when adding
            addRoom(values)
            .then(message => {
                console.log(message)
                notifications.show({
                    title: 'Add new room',
                    message: message,
                })
                if (props.onSubmit) props.onSubmit();
            })    
        } 
        else {
            if (props.data) updateRoom(props.data._id, values)
                .then(message => {
                    console.log(message)
                    notifications.show({
                        title: 'Edit room',
                        message: message,
                    })
                    if (props.onSubmit) props.onSubmit();
                });
        }
    })

    return (
        <form className="flex flex-col gap-2" onSubmit={submitCallback}>
            <div className="grid grid-cols-2 gap-4">
                <TextInput
                    className="col-span-2"
                    withAsterisk
                    label="Room Number"
                    placeholder="Room Number"
                    key={form.key('roomNumber')}
                    {...form.getInputProps('roomNumber')}
                />
                <TextInput
                    withAsterisk
                    label="Max Row"
                    placeholder="Max Row"
                    key={form.key('maxRow')}
                    {...form.getInputProps('maxRow')}
                />
                <TextInput
                    withAsterisk
                    label="Max Column"
                    placeholder="Max Column"
                    key={form.key('maxColumn')}
                    {...form.getInputProps('maxColumn')}
                />
            </div>
            <Button className="col-span-3 self-end" type="submit">Submit</Button>
        </form>
    )
}

export default RoomForm;