import { Button, Textarea, TextInput } from "@mantine/core";
import { SeatType } from "../../../types/SeatType";
import { useForm } from "@mantine/form";
import {notifications} from '@mantine/notifications';
import { addSeatType, updateSeatType } from "../../../api/SeatTypeAPI";

interface Props {
    edit?: boolean,
    data?: SeatType,
    onSubmit?: () => void
}

function SeatTypeForm(props: Props) {
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
            addSeatType(values)
            .then(message => {
                console.log(message)
                notifications.show({
                    title: 'Add new seat type',
                    message: message,
                })
                if (props.onSubmit) props.onSubmit();
            })    
        } 
        else {
            if (props.data) updateSeatType(props.data._id, values)
                .then(message => {
                    console.log(message)
                    notifications.show({
                        title: 'Edit seat type',
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
                    withAsterisk
                    label="Label"
                    placeholder="Label"
                    key={form.key('label')}
                    {...form.getInputProps('label')}
                />
                <TextInput
                    withAsterisk
                    label="Price"
                    placeholder="Price"
                    key={form.key('price')}
                    {...form.getInputProps('price')}
                />
                <TextInput
                    withAsterisk
                    label="Value"
                    placeholder="Value"
                    key={form.key('value')}
                    {...form.getInputProps('value')}
                />
                <TextInput
                    withAsterisk
                    label="Color hex value"
                    placeholder="Hex value"
                    key={form.key('color')}
                    {...form.getInputProps('color')}
                />
            </div>
            <Button className="col-span-3 self-end" type="submit">Submit</Button>
        </form>
    )
}

export default SeatTypeForm;