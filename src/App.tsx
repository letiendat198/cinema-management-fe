import '@mantine/core/styles.css';
import { AppShell} from '@mantine/core';
import Home from './pages/Home';
import Header from './components/Header';
// import './debugCSS.css'

function App() {
  return (
      <AppShell header={{height: 60}}>
        <AppShell.Header>
          <Header/>
        </AppShell.Header>
        <AppShell.Main>
          <Home/>
        </AppShell.Main>
      </AppShell>
  )
}

export default App
