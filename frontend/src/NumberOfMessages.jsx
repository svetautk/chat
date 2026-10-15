import { useQuery } from '@tanstack/react-query'
import { useTranslation } from "react-i18next"
import useAppStore from './store'

export default function NumberOfMessages() {
    const activeChannel = useAppStore(state => state.activeChannel)
    const { t } = useTranslation()

    const { data: messages } = useQuery({
        queryKey: ['messageList'],
        queryFn: () => {},
        enabled: false,
        staleTime: Infinity,
    })

    const actualMessages = messages?.filter(item => item.channelId === activeChannel?.id)
    const number = actualMessages?.length ?? 0

    return (
        <p style={{ color: 'var(--text-l)', fontSize: 12, }}>
            {t('chatPage.numberOfMessages.key', { count: number })}
        </p>
    )
}