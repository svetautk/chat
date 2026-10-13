import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { useNavigate, Link } from 'react-router'
import useAppStore from './store'
import styles from './LoginAndSignUpPage.module.css'

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
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                form.setFieldError('password', 'Неверные имя пользователя или пароль')
            }
        }
    }

    return (
        <div className={styles.box}>
            <div className={styles.flexContainer}>
                <div>
                    <img src='../public/mainImage.png' className={styles.mainImage}/>
                </div>
                <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
                    <h1 className={styles.header}>Войти</h1>
                    <div className={styles.textInputWrapper}> 
                        <TextInput {...form.getInputProps('username')} label="Ваш ник" required
                            classNames={
                                        {
                                            label: styles.inputLabel, 
                                            input: styles.input, 
                                            error: styles.inputError 
                                        }
                                    }
                        />
                        <TextInput {...form.getInputProps('password')} label="Пароль" required
                            type="password" classNames={
                                            {
                                                label: styles.inputLabel, 
                                                input: styles.input, 
                                                error: styles.inputError 
                                            }
                                        }
                        />
                        <button type="submit" className={styles.submitButton}>
                            Войти
                        </button>
                    </div> 
                </form>
            </div>
            <div>
                <p className={styles.signUpParagraf}>Нет аккаунта? &nbsp;
                    <Link to='/signup' className={styles.signUpLink}>
                        Регистрация
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage