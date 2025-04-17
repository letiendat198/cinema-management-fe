import '@mantine/core/styles.css';
import { AppShell} from '@mantine/core';
import { Outlet } from 'react-router';
import Header from './components/Header';
// import './debugCSS.css'

function App() {
  return (
      <AppShell header={{height: 60}}>
        <AppShell.Header>
          <Header/>
        </AppShell.Header>
        <AppShell.Main>
          <div className='px-20 mt-2'>
            <Outlet />  
          </div>
        </AppShell.Main>
      </AppShell>
  )
}

export default App
