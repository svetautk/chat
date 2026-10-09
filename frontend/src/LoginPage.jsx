import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { useNavigate } from 'react-router'
import useAppStore from './store'

function LoginPage() {
    const navigate = useNavigate()
    const addUserData = useAppStore((state) => state.addUserData)

    const form = useForm({
        mode: 'controlled',
        initialValues: { username: '', password: '', },
    })

    const handleSubmit = async (values) => {
        try {
            const response = await axios.post('/api/v1/login', values)
            addUserData(response.data)
            navigate('/')
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response.status === 401) {
                form.setFieldError('password', 'Неверные имя пользователя или пароль')
            }
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <h1>Войти</h1>
            <TextInput {...form.getInputProps('username')} label="Ваш ник" />
            <TextInput {...form.getInputProps('password')} label="Пароль" type="password" />
            <Button type="submit">
                Войти
            </Button>
        </form>
    )
}

export default LoginPage