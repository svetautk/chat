import { BrowserRouter, Routes, Route } from 'react-router'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import CheckAuth from './CheckAuth.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import LoginPage from './LoginPage.jsx'
import SignUpPage from './SignUpPage.jsx'
import { MantineProvider } from '@mantine/core'
import Layout from './Layout.jsx'

const queryClient = new QueryClient()

function App() {
  return (
    <MantineProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout/>}>
              <Route path='/' element={<CheckAuth/>} />
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/signup' element={<SignUpPage/>} />
            </Route>
            <Route path='*' element={<NotFoundPage/>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default App
