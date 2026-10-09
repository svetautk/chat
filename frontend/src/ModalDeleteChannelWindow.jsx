import useAppStore from './store'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import axios from 'axios'
import styles from './ModalWindow.module.css'

export default function ModalDeleteChannelWindow() {
    const token = useAppStore(state => state.userData.token)
    const setActiveModal = useAppStore(state => state.setActiveModal)
    const activeChannel = useAppStore(state => state.activeChannel)
    const setActiveChannel = useAppStore(state => state.setActiveChannel)

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
        }
        catch (error) {
            console.log(error) //надо что-то показать пользователю?
        }
    }

    return (
        <div className={styles.modalContainer}>
            <h3>Do you want to delete '{activeChannel.name}'?</h3>
            <div>
                <button onClick={handleSubmit}>Delete</button> 
                <button onClick={handleCancel}>Cancel</button>  
            </div>
        </div>
    )
}