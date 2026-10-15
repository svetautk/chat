import axios from 'axios'
import useAppStore from './store'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import styles from './Channels.module.css'
import { useEffect } from 'react'
import { socket } from './socket.js'
import ActiveChannel from './ActiveChannel.jsx'

function Channels() {
    const token = useAppStore(state => state.userData?.token)
    const activeChannel = useAppStore(state => state.activeChannel)
    const setActiveChannel = useAppStore(state => state.setActiveChannel)
    const queryClient = useQueryClient()

    useEffect(() => {
        const handleAdd = (payload) => {
            queryClient.setQueryData(['channelsArray'], (oldData) => [ ...oldData, payload ])
        }

        socket.on('newChannel', handleAdd)

        return () => {
            socket.off('newChannel', handleAdd)
        } 
    }, [])

    useEffect(() => {
        const handleRename = (payload) => {
            queryClient.setQueryData(['channelsArray'], (oldData) => {
                const targetIndex = oldData.findIndex(item => item.id === payload.id)
                return oldData?.with(targetIndex, payload)
            }) 
        }
        socket.on('renameChannel', handleRename)

        return () => {
            socket.off('renameChannel', handleRename)
        } 
    }, [])

    useEffect(() => {
        const handleDelete = (payload) => {
            queryClient.setQueryData(['channelsArray'], (oldData) => {
                const newData = oldData.filter(item => item.id !== payload.id)
                return newData
            })
            queryClient.setQueryData(['messageList'], (oldData) => {
                const newData = oldData.filter(item => item.channelId !== payload.id)
                return newData
            })
        }
        socket.on('removeChannel', handleDelete)

        return () => {
            socket.off('removeChannel', handleDelete)
        }
    }, [])

    const renderList = (array) => {
        return (array.map((item) => {
                    if (item.id === activeChannel?.id) {
                        return <ActiveChannel key={item.id} item={item}/>
                    } 
                    return (
                        <li key={item.id} id={item.id} className={styles.channelItem}>
                            <div className={styles.channelRow}>
                                <p className={styles.channelName}># {item.name}</p>
                            </div>
                        </li>)
        }))
    }

    const handleChangeChannel = (event) => {
        const targetLi = event.target.closest(`.${styles.channelItem}`)
        if (!targetLi) return
        const targetChannelId = targetLi.id
        const newActiveChanel = data.find(item => item.id === targetChannelId)
        setActiveChannel(newActiveChanel)
    }

    const { isPending, error, data } = useQuery({
        queryKey: ['channelsArray'],
        queryFn: async () => {
            const { data } = await axios.get('/api/v1/channels', {headers: {Authorization: `Bearer ${token}`,}})
            return data || []
        },
        initialData: [],
    })

    if (isPending) {
        return 'Loading...'
    }

    if (error) return 'An error has occurred: ' + error.message

    return (
        <ul onClick={handleChangeChannel} className={styles.channelList}>
            {renderList(data)}
        </ul>
    )
}

export default Channels