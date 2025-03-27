import { Button, Group, useMantineTheme, Text } from '@mantine/core';

function Header() {
    const theme = useMantineTheme();
    return (
        <div className='flex h-full justify-between px-2' style={{backgroundColor: theme.colors[theme.primaryColor][6]}}>
            <Group>
                <p className='text-white font-bold text-xl'>Cinemax</p>
                <Group className='h-full'>
                    <Button classNames={{label: "font-bold text-xl", root: "!h-full"}}>Movies</Button>
                    <Button classNames={{label: "font-bold text-xl", root: "!h-full"}}>Cinemas</Button>
                </Group>  
            </Group>
            <Group className='h-full'>
                <Button classNames={{label: "font-bold text-xl", root: "!h-full"}}>Register</Button>
                <Button classNames={{label: "font-bold text-xl", root: "!h-full"}}>Login</Button>
            </Group>
        </div>
    )
}

export default Header