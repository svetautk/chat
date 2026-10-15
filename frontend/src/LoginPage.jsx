import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { useNavigate, Link } from 'react-router'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useAppStore from './store'
import styles from './LoginAndSignUpPage.module.css'

function LoginPage() {
    const navigate = useNavigate()
    const addUserData = useAppStore((state) => state.addUserData)
    const inputRef = useRef(null)
    const { t } = useTranslation()

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

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
                form.setFieldError('password', t('loginPage.mistake'))
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
                    <h1 className={styles.header}>{t('loginPage.formHeader')}</h1>
                    <div className={styles.textInputWrapper}> 
                        <TextInput {...form.getInputProps('username')} label={t('loginPage.usernameInputLabel')}
                            required ref={inputRef} classNames={
                                        {
                                            label: styles.inputLabel, 
                                            input: styles.input, 
                                            error: styles.inputError 
                                        }
                                    }
                        />
                        <TextInput {...form.getInputProps('password')} label={t('loginPage.passwordInputLabel')} required
                            type="password" classNames={
                                            {
                                                label: styles.inputLabel, 
                                                input: styles.input, 
                                                error: styles.inputError 
                                            }
                                        }
                        />
                        <button type="submit" className={styles.submitButton}>
                            {t('loginPage.submitButton')}
                        </button>
                    </div> 
                </form>
            </div>
            <div>
                <p className={styles.signUpParagraf}>{t('loginPage.notHaveAccount')}&nbsp;
                    <Link to='/signup' className={styles.signUpLink}>
                        {t('loginPage.registrationLink')}
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage