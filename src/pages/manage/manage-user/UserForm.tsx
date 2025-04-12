import { Button, TextInput } from "@mantine/core";
import { User } from "../../../types/User";
import { useForm } from "@mantine/form";
import { addUser, updateUser } from "../../../api/UserAPI";
import {notifications} from '@mantine/notifications';

interface Props {
    edit?: boolean,
    data?: User,
    onSubmit?: () => void
}

function UserForm(props: Props) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: props.data,
        validate: {
            username: (value) => !value ? "Cannot be empty!" : null,
            email:  (value) => !value ? "Cannot be empty!" : null,
            password:  (value) => (!value && !props.edit) ? "Cannot be empty!" : null,
        }
    });

    let submitCallback = form.onSubmit((values) => {
        if (!props.edit){
            addUser(values)
            .then(message => {
                console.log(message)
                notifications.show({
                    title: 'Add new user',
                    message: message,
                })
            })    
        } 
        else {
            if (props.data) updateUser(props.data._id, values)
                .then(message => {
                    console.log(message)
                    notifications.show({
                        title: 'Edit user',
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
                    label="Username"
                    placeholder="Username"
                    key={form.key('username')}
                    {...form.getInputProps('username')}
                />
                <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="Email"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <TextInput
                    withAsterisk = {props.edit ? false : true}
                    label="Password"
                    placeholder="Password"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />
                <TextInput
                    label="Role"
                    placeholder="Role"
                    key={form.key('role')}
                    {...form.getInputProps('role')}
                />    
            </div>
            <Button className="col-span-2 self-end" type="submit">Submit</Button>
        </form>
    )
}

export default UserForm;