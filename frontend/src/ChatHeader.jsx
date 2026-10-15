import useAppStore from './store'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import NumberOfMessages from './NumberOfMessages'
import styles from './ChatHeader.module.css'

export default function ChatHeader() {
    const activeChannel = useAppStore(state => state.activeChannel)
    const setActiveChannel = useAppStore(state => state.setActiveChannel)

    const { data: channels } = useQuery({
        queryKey: ['channelsArray'],
        queryFn: () => {},
        enabled: false,
        staleTime: Infinity,
    })

    useEffect(() => { // проверить надо ли это все
        if (!activeChannel || channels.length === 0) return
        const channelExist = channels.find(item => item.id === activeChannel.id)
        if (!channelExist) { 
            setActiveChannel(channels[0])
        }
    }, [channels, activeChannel])

    return (
        <div className={styles.chatHeader}>
            <h3 className={styles.h3}># {activeChannel?.name}</h3>
            <NumberOfMessages/>
        </div>
    )
}