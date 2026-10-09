import axios from 'axios'
import useAppStore from './store'
import { useEffect, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { socket } from './socket.js'
import styles from './MessagesList.module.css'

export default function MessagesList() {
    const token = useAppStore(state => state.userData.token)
    const activeChannel = useAppStore(state => state.activeChannel)
    const queryClient = useQueryClient()
    const chatRef = useRef(null)
    
    useEffect(() => {
        const handleUpdate = (payload) => {
            queryClient.setQueryData(['messageList'], (oldData) => [ ...oldData, payload ]) 
        }

        socket.on('newMessage', handleUpdate)

        return () => {
            socket.off('newMessage', handleUpdate)
        }
    }, [])

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    })

    const renderMessages = (array) => {
        const actualMessages = array.filter(item => item.channelId === activeChannel.id)
        return actualMessages.map((item) => (
            <li key={item.id} id={item.id} className={styles.li}>
                <pre className={styles.pre}><b>{item.username}</b>: {item.body.message}</pre>
            </li>))
    }
    
    const { isPending, error, data } = useQuery({
        queryKey: ['messageList'],
        queryFn: async () => {
            const { data } = await axios.get('/api/v1/messages', {headers: {Authorization: `Bearer ${token}`,},})
            return data || []
        },
        initialData: [],
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (
        <div ref={chatRef} className={styles.container}>
            <ul className={styles.ul}>
                { renderMessages(data) }
            </ul>
        </div>
    )
}