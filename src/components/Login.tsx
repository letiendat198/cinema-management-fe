import { Button, Grid, Modal, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { useLoginState } from "../hooks/loginState"
import { useEffect, useState } from "react";
import { loginUser } from "../api/UserAPI";
import { useUserStore } from "../hooks/userStore";

function Login() {
    const [message, setMessage] = useState<string>();

    const loginOpened = useLoginState(state => state.loginOpened);
    const loginOpen = useLoginState(state => state.loginOpen);
    const loginClose = useLoginState(state => state.loginClose);
    const force = useLoginState(state => state.force);

    const setUser = useUserStore(state => state.setUser);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            username: '',
            password: ''
        },
        validate: {
            username: (value) => !value ? "Please provide username" : null,
            password: (value) => !value ? "Please provide password" : null
        }
    })

    const onSubmit = form.onSubmit(values => {
        loginUser(values.username, values.password).then(user => {
            setUser(user);
            loginClose();
        }).catch(setMessage)
    })

    return (
        <Modal zIndex={1000} size='sm' opened={loginOpened} onClose={loginClose} trapFocus={!force} closeOnEscape={!force} closeOnClickOutside={!force} withCloseButton={!force}>
            <p className="text-center text-2xl font-semibold">{force ? 'Please log in to continue' : 'Login to Cinemax'}</p>
            <form className="flex flex-col gap-4 mt-2" onSubmit={onSubmit}>
                <TextInput
                    label="Username"
                    placeholder="Username"
                    key={form.key('username')}
                    {...form.getInputProps('username')}
                />
                <TextInput
                    label="Password"
                    type="password"
                    placeholder="Password"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />
                <p className="text-red-500">{message}</p>
                <div className="flex gap-2 justify-around">
                    <Button variant="outline">Register</Button>
                    <Button type="submit">Login</Button>    
                </div>
            </form>
        </Modal>
    )
}

export default Login