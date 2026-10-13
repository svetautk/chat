import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { useNavigate, Link } from 'react-router'
import useAppStore from './store'
import styles from './LoginAndSignUpPage.module.css'

export default function SignUpPage () {
    const navigate = useNavigate()
    const addUserData = useAppStore((state) => state.addUserData)

    const form = useForm({
        mode: 'controlled',
        initialValues: { 
            username: '', 
            password: '', 
            repeatPassword: '',
        },
        validate: {
            username: (value) => ( (value.length < 3 ||  value.length > 20) ? 
            'Must be between 3 and 20 characters long' : null),
            password: (value) => ( value.length < 6 ? 
            'Must be at least 6 characters long' : null),
        },
    })

    const handleSubmit = async (values) => {
        if (values.password !== values.repeatPassword) {
            form.setFieldError('repeatPassword', 'Пароли должны совпадать')
            return
        }
        try {
            const body = { username: values.username, password: values.password }
            const response = await axios.post('/api/v1/signup', body)
            addUserData(response.data)
            navigate('/')
        }
        catch (error) {
            console.log(error)
            if (axios.isAxiosError(error) && error.response.status === 409) {
                form.setFieldError('username', 'Такой пользователь уже существует')
            } else {
                form.setFieldError('repeatPassword', 'Что-то пошло не так')
            }
        }
    }

    return (
        <div className={styles.box}>
            <div className={styles.flexContainer}>
                <div>
                    <img src='/mainImage.png' className={styles.mainImage}/>
                </div>
                <form onSubmit={form.onSubmit(handleSubmit)} className={styles.form}>
                    <h1 className={styles.header}>Регистрация</h1>
                    <div className={styles.textInputWrapper}> 
                        <TextInput {...form.getInputProps('username')} 
                            label="Имя пользователя" required
                            classNames={
                                            {
                                                label: styles.inputLabel, 
                                                input: styles.input, 
                                                error: styles.inputError 
                                            }
                                        }
                        />
                        <TextInput {...form.getInputProps('password')} 
                            label="Пароль" type="password" required
                            classNames={
                                            {
                                                label: styles.inputLabel, 
                                                input: styles.input, 
                                                error: styles.inputError 
                                            }
                                        }
                        />
                        <TextInput {...form.getInputProps('repeatPassword')} 
                            label="Подтвердите пароль" type="password" required
                            classNames={
                                            {
                                                label: styles.inputLabel, 
                                                input: styles.input, 
                                                error: styles.inputError 
                                            }
                                        }
                        />
                    </div>
                    <Button type="submit" className={styles.submitButton}>
                        Зарегистрироваться
                    </Button>
                </form>
            </div>
            <div>
                <p className={styles.signUpParagraf}>Уже зарегистрированы? &nbsp;
                    <Link to='/login' className={styles.signUpLink}>
                        Войти в свой аккаунт
                    </Link>
                </p>
            </div>
        </div>
    )
}