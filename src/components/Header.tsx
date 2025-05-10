import { Button, Menu, useMantineTheme } from '@mantine/core';
import { Link } from 'react-router';
import { useLoginState } from '../hooks/loginState';
import Login from './Login';
import { useUserStore } from '../hooks/userStore';
import { IconTicket, IconUser } from '@tabler/icons-react';

function Header() {
    const loginOpen = useLoginState(state => state.loginOpen);
    const setForce = useLoginState(state => state.setForce);
    const user = useUserStore(state => state.user);
    const revokeUser = useUserStore(state => state.revokeUser);

    return (
        <div className='flex h-full justify-between items-center px-20'>
            <div className='flex justify-center items-center gap-10'>
                <Link to='/' className='font-bold text-4xl hover:text-primary'>Cinemax</Link>
                <div className='flex justify-center items-center gap-4 mt-1'>
                    <Link className='hover:text-primary' to='/movies'>Movies</Link>
                    <Link className='hover:text-primary' to='/cinemas'>Cinema</Link>
                    {user?.role == 'admin' ? <Menu shadow='md' width={200} trigger='hover' position='bottom-start'>
                        <Menu.Target>
                            <p className='hover:text-primary'>Manage</p>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item>
                                <Link className='flex' to='/manage/user'>Manage User</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='flex' to='/manage/movie'>Manage Movie</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='flex' to='/manage/cinema'>Manage Cinema</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='flex' to='/manage/schedule'>Manage Schedule</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Link className='flex' to='/manage/item'>Manage Item</Link>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu> : <></>}
                </div>  
            </div>
            <div className='flex justify-center items-center gap-4 mt-1'>
                <Link className='flex gap-2 hover:text-primary' to='/my-ticket'><IconTicket /> My ticket</Link>
                <div className='flex gap-2 hover:text-primary'>
                    <IconUser />
                    <Menu shadow='md' width={200} trigger='hover' position='bottom-start'>
                        <Menu.Target>
                            {user ?  <p>{user.username}</p> : <button className='hover:text-primary hover:cursor-pointer' onClick={() => {
                                setForce(false);
                                loginOpen();
                            }}>Login / Register</button>}   
                        </Menu.Target>    
                        <Menu.Dropdown>
                            <Menu.Item>
                                <Link className='flex' to='/profile'>Profile</Link>
                            </Menu.Item>
                            <Menu.Item>
                                <p onClick={revokeUser} className='flex'>Log out</p>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>  
                <Login />
            </div>
        </div>
    )
}

export default Header