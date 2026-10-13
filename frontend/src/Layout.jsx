import { Outlet, NavLink, useNavigate } from "react-router"
import useAppStore from './store'
import { useQueryClient } from '@tanstack/react-query'
import styles from './Layout.module.css'

export default function Layout() {
    const token = useAppStore(state => state.userData?.token)
    const addUserData = useAppStore((state) => state.addUserData)
    const setActiveChannel = useAppStore(state => state.setActiveChannel)
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleLogOut = () => {
        queryClient.clear()
        navigate('/login')
        addUserData(null)
        setActiveChannel({ id: '1', name: 'general', removable: false, })
    }

    return (
        <>
            <header className={styles.header}>
                <div>
                    <NavLink to='/' className={styles.mainPageLink}>Hexlet chat</NavLink>
                </div>
                <div>
                    { token ? 
                    <button onClick={handleLogOut} className={styles.logOutButton}>
                        Выйти
                    </button> : null }
                </div>
            </header>
            <Outlet/>
        </>
    )
}