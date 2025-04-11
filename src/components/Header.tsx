import { Button, Menu, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router';

function Header() {
    const theme = useMantineTheme();
    return (
        <div className='flex h-full justify-between items-center px-20'>
            <div className='flex justify-center items-center gap-10'>
                <Link to='/' className='font-bold text-4xl hover:text-primary'>Cinemax</Link>
                <div className='flex justify-center items-center gap-4 mt-1'>
                    <Link className='hover:text-primary' to='/movies'>Movies</Link>
                    <Link className='hover:text-primary' to='/cinemas'>Cinema</Link>
                    <Menu shadow='md' width={200} trigger='hover' position='bottom-start'>
                        <Menu.Target>
                            <p className='hover:text-primary'>Manage</p>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>
                                <Link to='/manage/user'>Manage User</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to='/manage/movie'>Manage Movie</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to='/manage/cinema'>Manage Cinema</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link to='/manage/schedule'>Manage Schedule</Link>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>  
            </div>
            <div className='flex justify-center items-center gap-4 mt-1'>
                <Link className='hover:text-primary' to='/register'>Register</Link>
                <Link className='hover:text-primary' to='/login'>Login</Link> 
            </div>
        </div>
    )
}

export default Header