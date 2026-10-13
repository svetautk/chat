import { Button, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form'
import useAppStore from './store'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import styles from './ModalWindow.module.css'

export default function ModalRenameChannelWindow() {
    const token = useAppStore(state => state.userData?.token)
    const activeChannel = useAppStore(state => state.activeChannel)
    const setActiveChannel = useAppStore(state => state.setActiveChannel)
    const setActiveModal = useAppStore(state => state.setActiveModal)

    const { data: channels } = useQuery({
        queryKey: ['channelsArray'],
        queryFn: () => {},
        enabled: false,
        staleTime: Infinity,
    })

    const form = useForm({
        mode: 'controlled',
        initialValues: { name: '', },
        validate: {
            name: (value) => ( (value.trim().length < 3 || value.trim().length > 20) ?
            'От 3 до 20 символов' : null
            )
        },
        transformValues: (value) => ({
            name: value.name.trim()
        }),
    })

    const handleCancel = () => setActiveModal(null)

    const handleSubmit = async (value) => {
        if (!channels || !activeChannel) return
        const channelExist = channels.find(item => item.name.toLowerCase() === value.name.toLowerCase())
        if (channelExist) {
            form.setFieldError('name', 'Такой канал уже существует')
            return
        }
        try {
            const response = await axios.patch(`/api/v1/channels/${activeChannel.id}`, value, {
                headers: { Authorization: `Bearer ${token}`,},})
                setActiveChannel(response.data)
                setActiveModal(null)
                form.reset()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.modalContainer}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <div className={styles.modalHead}>
                    <h3 className={styles.modalHeader}>Переименовать канал?</h3>
                    <button type="button" onClick={handleCancel} className={styles.closeButton}>
                        <img src="../public/close.png" className={styles.closeButtonIcon}/>
                    </button>
                </div>
                <TextInput {...form.getInputProps('name')} classNames={
                        {
                            label: styles.inputLabel, 
                            input: styles.input, 
                            error: styles.inputError 
                        }
                    }
                    label="Имя канала" 
                />
                <div className={styles.flexButtonContainer}>
                    <button type="button" onClick={handleCancel} className={styles.button}>Отменить</button>
                    <button type="submit" className={styles.sendButton}>Отправить</button>
                </div>
            </form>
        </div>
    )
}