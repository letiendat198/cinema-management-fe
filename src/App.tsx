import '@mantine/core/styles.css';
import { AppShell} from '@mantine/core';
import { Outlet } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
// import './debugCSS.css'

function App() {
  return (
      <AppShell header={{height: 60}}>
        <AppShell.Header>
          <Header/>
        </AppShell.Header>
        <AppShell.Main>
          <Outlet/>
          <Footer />
        </AppShell.Main>
      </AppShell>
  )
}

export default App
