import { useForm } from '@mantine/form'
import { Button } from '@mantine/core'
import axios from 'axios'
import { useTranslation } from "react-i18next"
import useAppStore from './store'
import styles from './MessageForm.module.css'

export default function MessageForm() {
    const userName = useAppStore(state => state.userData?.username)
    const token = useAppStore(state => state.userData?.token)
    const channelId = useAppStore(state => state.activeChannel?.id)
    const { t } = useTranslation()

    const form = useForm({
        mode: 'controlled',
        initialValues: { message: '', },
    })

    const handleSubmit = async (value) => {
        const newMessage = { body: value, channelId: channelId, username: userName }
        try {
            await axios.post('/api/v1/messages', newMessage, { headers: { Authorization: `Bearer ${token}`, }, })
            form.reset()
        }
        catch (error) {
            if (axios.response) {
                if (axios.isAxiosError(error) && error.response.status >= 400) {
                    form.setErrors('message', 'Сообщение не отправлено')
                }
            }
            form.setErrors('message', 'Что-то пошло не так')  // если сети нет совсем
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
            <textarea {...form.getInputProps('message')} placeholder={t('chatPage.writeMessage')}
                required rows="1" className={styles.textarea}/>
            <Button type="submit" className={styles.button} aria-label={t('chatPage.sendMessageButton')}>
                <img src='/icon_sending_message.png' className={styles.img}/>
            </Button>
        </form>
    )
}