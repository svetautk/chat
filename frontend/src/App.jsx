import { BrowserRouter, Routes, Route } from 'react-router'
import CheckAuth from './CheckAuth.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import LoginPage from './LoginPage.jsx'
import { MantineProvider } from '@mantine/core'
import Layout from './Layout.jsx'

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<CheckAuth/>} />
            <Route path='/login' element={<LoginPage/>} />
          </Route>
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
