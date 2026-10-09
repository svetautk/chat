import { Button, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form'
import { useQuery } from '@tanstack/react-query'
import useAppStore from './store'
import axios from 'axios'
import styles from './ModalWindow.module.css'

export default function ModalAddChannelWindow() {
    const token = useAppStore(state => state.userData.token)
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
            'Must be between 3 and 20 characters long' : null
            )
        },
        transformValues: (value) => ({
            name: value.name.trim()
        }),
    })

    const handleCancel = () => setActiveModal(null)

    const handleSubmit = async (value) => {
        if (!channels) return
        const channelExist = channels.find(item => item.name.toLowerCase() === value.name.toLowerCase())
        if (channelExist) {
            form.setFieldError('name', 'Такой канал уже существует')
            return
        } 

        try {
            const response = await axios.post('/api/v1/channels', value, {
                headers: { Authorization: `Bearer ${token}`,},})
                setActiveChannel(response.data)
                setActiveModal(null)
                form.reset()
        }
        catch (error) {
            form.setFieldError('name', 'Что-то пошло не так') 
        }
    }

    return (
        <div className={styles.modalContainer}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <h3>Add Channel</h3>
                <TextInput 
                    {...form.getInputProps('name')} 
                    label="Name of channel" 
                />
                <div>
                    <Button type="submit">Send</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}