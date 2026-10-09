import { useQuery } from '@tanstack/react-query'
import useAppStore from './store'

export default function NumberOfMessages() {
    const activeChannel = useAppStore(state => state.activeChannel)

    const { data: messages } = useQuery({
        queryKey: ['messageList'],
        queryFn: () => {},
        enabled: false,
        staleTime: Infinity,
    })

    const actualMessages = messages?.filter(item => item.channelId === activeChannel.id)

    return (
        <p style={{ color: 'var(--text-l)', fontSize: 12, }}>
            {actualMessages?.length ?? 0} messages
        </p>
    )
}