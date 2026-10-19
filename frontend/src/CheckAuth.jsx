import { Navigate } from "react-router"
import useAppStore from './store'
import ChatPage from './ChatPage.jsx'


function CheckAuth() {
    const token = useAppStore(state => state.userData?.token)

    return (
        token ? <ChatPage/> : <Navigate to='/login'/>
    ) 
}

export default CheckAuth