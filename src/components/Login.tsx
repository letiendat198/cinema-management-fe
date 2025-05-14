import { Button, Grid, Modal, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { useLoginState } from "../hooks/loginState"
import { useEffect, useState } from "react";
import { addUser, loginUser } from "../api/UserAPI";
import { useUserStore } from "../hooks/userStore";

function Login() {
    const [isLogin, setIsLogin] = useState<boolean>(true);
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
            password: '',
            email: ''
        },
        validate: {
            username: (value) => !value ? "Please provide username" : null,
            password: (value) => !value ? "Please provide password" : null
        }
    })

    const close = () => {
        setMessage(undefined);
        setIsLogin(true);
        form.reset()
        loginClose();
    }

    const onLoginSubmit = form.onSubmit(values => {
        loginUser(values.username, values.password).then(user => {
            setUser(user);
            close();
            window.location.reload();
        }).catch(setMessage)
    })

    const onRegisterSubmit = form.onSubmit(values => {
        addUser({username: values.username, password: values.password, email: values.email}).then(data => {
            setUser(data);
            close();
        }).catch(setMessage)
    })

    return (
        <Modal zIndex={1000} size='xs' opened={loginOpened} onClose={close} trapFocus={!force} closeOnEscape={!force} closeOnClickOutside={!force} withCloseButton={!force}>
            <p className="text-center text-2xl font-semibold">{isLogin ? (force ? 'Please log in to continue' : 'Login to Cinemax') : 'Register to Cinemax'}</p>
            {isLogin ? 
            <form className="flex flex-col gap-4 mt-4" onSubmit={onLoginSubmit}>
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
                <div className="flex gap-2">
                    <Button fullWidth  variant="outline" onClick={() => setIsLogin(false)}>Register</Button>
                    <Button fullWidth type="submit">Login</Button>    
                </div>
            </form> : 
            <form className="flex flex-col gap-4 mt-4" onSubmit={onRegisterSubmit}>
                <TextInput
                    label="Username"
                    placeholder="Username"
                    key={form.key('username')}
                    {...form.getInputProps('username')}
                />
                <TextInput
                    label="Email"
                    placeholder="Email"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                />
                <TextInput
                    label="Password"
                    type="password"
                    placeholder="Password"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                />
                <p className="text-red-500">{message}</p>
                <div className="flex gap-2">
                    <Button fullWidth type="submit">Register</Button>
                    <Button fullWidth variant="outline" onClick={() => setIsLogin(true)}>Login</Button>    
                </div>
            </form>}
        </Modal>
    )
}

export default Login