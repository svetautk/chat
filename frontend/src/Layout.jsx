import { Outlet, NavLink, useNavigate } from "react-router"
import useAppStore from './store'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from "react-i18next"
import styles from './Layout.module.css'

export default function Layout() {
    const token = useAppStore(state => state.userData?.token)
    const addUserData = useAppStore((state) => state.addUserData)
    const setActiveChannel = useAppStore(state => state.setActiveChannel)
    const currentLang = useAppStore(state => state.language)
    const setLanguage = useAppStore(state => state.setLanguage)

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { t, i18n } = useTranslation()

    const handleLogOut = () => {
        navigate('/login')
        addUserData(null)
        queryClient.clear()
        setActiveChannel({ id: '1', name: 'general', removable: false, })
    }

    const handleChangeLanguage = () => {
        if (currentLang === 'en') {
            i18n.changeLanguage('ru')
            setLanguage('ru')
        } else {
            i18n.changeLanguage('en')
            setLanguage('en')
        }
    }

    const renderLangButton = () => {
        if (currentLang === 'en') {
            return 'ru'
        } else {
            return 'en'
        }
    }

    return (
        <>
            <div className={styles.containerLngButton}>
                <button onClick={handleChangeLanguage} className={styles.changeLngButton}>
                    {renderLangButton()}
                </button>
            </div>
            <header className={styles.header}>
                <div>
                    <NavLink to='/' className={styles.mainPageLink}>Chat</NavLink>
                </div>
                <div>
                    { token ? 
                    <button onClick={handleLogOut} className={styles.logOutButton}>
                        {t('layout.logOutButton')}
                    </button> : null }
                </div>
            </header>
            <Outlet/>
        </>
    )
}