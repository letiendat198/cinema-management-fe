import { Button, Textarea, TextInput } from "@mantine/core";
import { Cinema } from "../../../types/Cinema";
import { useForm } from "@mantine/form";
import {notifications} from '@mantine/notifications';
import { addCinema, updateCinema } from "../../../api/CinemaAPI";

interface Props {
    edit?: boolean,
    data?: Cinema,
    onSubmit?: () => void
}

function CinemaForm(props: Props) {
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
            addCinema(values)
            .then(message => {
                console.log(message)
                notifications.show({
                    title: 'Add new cinema',
                    message: message,
                })
                if (props.onSubmit) props.onSubmit();
            })    
        } 
        else {
            if (props.data) updateCinema(props.data._id, values)
                .then(message => {
                    console.log(message)
                    notifications.show({
                        title: 'Edit cinema',
                        message: message,
                    })
                    if (props.onSubmit) props.onSubmit();
                });
        }
    })

    return (
        <form className="flex flex-col gap-2" onSubmit={submitCallback}>
            <div className="grid grid-cols-1 gap-4">
                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Name"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    withAsterisk
                    label="Location"
                    placeholder="Location"
                    key={form.key('location')}
                    {...form.getInputProps('location')}
                />
            </div>
            <Button className="col-span-3 self-end" type="submit">Submit</Button>
        </form>
    )
}

export default CinemaForm;