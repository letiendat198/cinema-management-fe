import { AppShell} from '@mantine/core';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Header from '../components/Header';
import { useUserStore } from '../hooks/userStore';
import { useEffect } from 'react';

function DefaultLayout() {
    return (
        <AppShell header={{height: 60}}>
          <AppShell.Header>
            <Header/>
          </AppShell.Header>
          <AppShell.Main>
            <div className='px-20 mt-4 mb-8'>
              <Outlet />  
            </div>
          </AppShell.Main>
        </AppShell>
    )
}

export default DefaultLayout;