import { Button, Grid, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"

function Login() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: ''
        }
    })
    return (
        <div className="flex h-svh justify-center items-center bg-linear-to-bl from-sky-500 to-indigo-500">
            <div className="flex flex-col gap-10 justify-start items-center p-10 bg-gray-50">
                <p className="text-center text-3xl font-bold">Login to Cinemax</p>
                <form className="flex flex-col gap-4">
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="Email"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        withAsterisk
                        label="Password"
                        placeholder="Password"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                    <Button className="self-center" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}

export default Login