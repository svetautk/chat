import { Navigate } from "react-router"
import ChatPage from './ChatPage.jsx'


function CheckAuth() {
    const appStore = JSON.parse(localStorage.getItem('appStore'))

    return (
        appStore && appStore?.state?.userData?.token ? <ChatPage/> : <Navigate to='/login'/>
    ) 
}

export default CheckAuth