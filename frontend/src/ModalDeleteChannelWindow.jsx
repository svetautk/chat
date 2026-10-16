import useAppStore from './store'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from "react-i18next"
import { notifications } from '@mantine/notifications'
import styles from './ModalWindow.module.css'

export default function ModalDeleteChannelWindow() {
    const token = useAppStore(state => state.userData?.token)
    const setActiveModal = useAppStore(state => state.setActiveModal)
    const activeChannel = useAppStore(state => state.activeChannel)
    const setActiveChannel = useAppStore(state => state.setActiveChannel)
    const { t } = useTranslation()

    const { data: channels } = useQuery({
        queryKey: ['channelsArray'],
        queryFn: () => {},
        enabled: false,
        staleTime: Infinity,
    })

    useEffect(() => {
        const handleSubmitEnter = (event) => {
        if (event.key === 'Enter') handleSubmit()
    }
        document.addEventListener('keydown', handleSubmitEnter)
        return () => document.removeEventListener('keydown', handleSubmitEnter)

    }, [channels, activeChannel, token])

    const handleCancel = () => setActiveModal(null)

    const handleSubmit = async () => {
        if (!channels || !activeChannel) return
        try {
            await axios.delete(`/api/v1/channels/${activeChannel.id}`, {
                headers: { Authorization: `Bearer ${token}`,},})
                setActiveChannel(channels[0])
                setActiveModal(null)
                notifications.show({
                    message: t('notifications.removeChannel'),
                    autoClose: 4000,
                })
        }
        catch (error) {
            console.log(error) //надо что-то показать пользователю?
        }
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalHead}>
                <h3 className={styles.modalHeader}>{t('removeChannelModal.header')}</h3>
                <button onClick={handleCancel} className={styles.closeButton}>
                    <img src="/close.png" className={styles.closeButtonIcon}/>
                </button>
            </div>
            <p className={styles.inputLabel}>{t('removeChannelModal.sure')}</p>
            <div className={styles.flexButtonContainer}>
                <button onClick={handleCancel} className={styles.button}>{t('removeChannelModal.cancelButton')}</button>  
                <button onClick={handleSubmit} className={styles.deleteButton}>{t('removeChannelModal.submitButton')}</button> 
            </div>
        </div>
    )
}