import { Outlet } from "react-router";
import styles from './Layout.module.css'

export default function Layout() {
    return (
        <>
            <header className={styles.header}>
                <h1>Chat</h1>
            </header>
            <Outlet/>
        </>
    )
}