import { Button, Textarea, TextInput } from "@mantine/core";
import { Item } from "../../../types/Item";
import { useForm } from "@mantine/form";
import {notifications} from '@mantine/notifications';
import { addItem, updateItem } from "../../../api/ItemAPI";

interface Props {
    edit?: boolean,
    data?: Item,
    onSubmit?: () => void
}

function ItemForm(props: Props) {
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
            addItem(values)
            .then(message => {
                console.log(message)
                notifications.show({
                    title: 'Add new item',
                    message: message,
                })
                if (props.onSubmit) props.onSubmit();
            })    
        } 
        else {
            if (props.data) updateItem(props.data._id, values)
                .then(message => {
                    console.log(message)
                    notifications.show({
                        title: 'Edit item',
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
                    label="Name"
                    placeholder="Name"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
                <TextInput
                    withAsterisk
                    label="Price"
                    placeholder="Price"
                    key={form.key('price')}
                    {...form.getInputProps('price')}
                />
                <TextInput
                    className="col-span-2"
                    label="Image"
                    placeholder="Image"
                    key={form.key('imageUrl')}
                    {...form.getInputProps('imageUrl')}
                />
                <Textarea
                    className="col-span-2"
                    label="Description"
                    placeholder="Description"
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />
            </div>
            <Button className="col-span-2 self-end" type="submit">Submit</Button>
        </form>
    )
}

export default ItemForm;