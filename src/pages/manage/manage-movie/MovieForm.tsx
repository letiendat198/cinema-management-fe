import { Button, Textarea, TextInput } from "@mantine/core";
import { Movie } from "../../../types/Movie";
import { useForm } from "@mantine/form";
import {notifications} from '@mantine/notifications';
import { addMovie, updateMovie } from "../../../api/MovieAPI";

interface Props {
    edit?: boolean,
    data?: Movie,
    onSubmit?: () => void
}

function MovieForm(props: Props) {
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
            addMovie(values)
            .then(message => {
                console.log(message)
                notifications.show({
                    title: 'Add new movie',
                    message: message,
                })
                if (props.onSubmit) props.onSubmit();
            })    
        } 
        else {
            if (props.data) updateMovie(props.data._id, values)
                .then(message => {
                    console.log(message)
                    notifications.show({
                        title: 'Edit movie',
                        message: message,
                    })
                    if (props.onSubmit) props.onSubmit();
                });
        }
    })

    return (
        <form className="flex flex-col gap-2" onSubmit={submitCallback}>
            <div className="grid grid-cols-3 gap-4">
                <TextInput
                    withAsterisk
                    label="Title"
                    placeholder="Title"
                    key={form.key('title')}
                    {...form.getInputProps('title')}
                />
                <TextInput
                    withAsterisk
                    label="Director"
                    placeholder="Director"
                    key={form.key('director')}
                    {...form.getInputProps('director')}
                />
                <TextInput
                    withAsterisk
                    label="Stars"
                    placeholder="Stars"
                    key={form.key('moviestars')}
                    {...form.getInputProps('moviestars')}
                />
                <TextInput
                    withAsterisk
                    label="Genre"
                    placeholder="Genre"
                    key={form.key('genre')}
                    {...form.getInputProps('genre')}
                />
                <TextInput
                    withAsterisk
                    label="Length"
                    placeholder="Length"
                    key={form.key('length')}
                    {...form.getInputProps('length')}
                />
                <TextInput
                    withAsterisk
                    label="Language"
                    placeholder="Language"
                    key={form.key('language')}
                    {...form.getInputProps('language')}
                />
                <TextInput
                    withAsterisk
                    label="Year"
                    placeholder="Year"
                    key={form.key('year')}
                    {...form.getInputProps('year')}
                />
                <TextInput
                    className="col-span-2"
                    label="Image"
                    placeholder="Image"
                    key={form.key('img')}
                    {...form.getInputProps('img')}
                />
                <Textarea
                    className="col-span-3"
                    label="Description"
                    placeholder="Description"
                    key={form.key('description')}
                    {...form.getInputProps('description')}
                />
            </div>
            <Button className="col-span-3 self-end" type="submit">Submit</Button>
        </form>
    )
}

export default MovieForm;