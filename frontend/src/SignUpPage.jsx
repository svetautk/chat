import { Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { useNavigate, Link } from 'react-router'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useAppStore from './store'
import styles from './LoginAndSignUpPage.module.css'

export default function SignUpPage () {
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
        initialValues: { 
            username: '', 
            password: '', 
            repeatPassword: '',
        },
        validate: {
            username: (value) => ( (value.length < 3 ||  value.length > 20) ? 
            t('signUpPage.mistake.minMaxLength') : null),
            password: (value) => ( value.length < 6 ? 
            t('signUpPage.mistake.minPasswordLength') : null),
        },
    })

    const handleSubmit = async (values) => {
        if (values.password !== values.repeatPassword) {
            form.setFieldError('repeatPassword', t('signUpPage.mistake.notSamePassword'))
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
                form.setFieldError('username', t('signUpPage.mistake.accountExist'))
            } else {
                form.setFieldError('repeatPassword', t('signUpPage.mistake.smthWrong'))
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
                    <h1 className={styles.header}>{t('signUpPage.formHeader')}</h1>
                    <div className={styles.textInputWrapper}> 
                        <TextInput {...form.getInputProps('username')} ref={inputRef}
                            label={t('signUpPage.usernameInputLabel')} required
                            classNames={
                                            {
                                                label: styles.inputLabel, 
                                                input: styles.input, 
                                                error: styles.inputError 
                                            }
                                        }
                        />
                        <TextInput {...form.getInputProps('password')} 
                            label={t('signUpPage.passwordInputLabel')} type="password" required
                            classNames={
                                            {
                                                label: styles.inputLabel, 
                                                input: styles.input, 
                                                error: styles.inputError 
                                            }
                                        }
                        />
                        <TextInput {...form.getInputProps('repeatPassword')} 
                            label={t('signUpPage.repeatPassword')} type="password" required
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
                        {t('signUpPage.submitButton')}
                    </Button>
                </form>
            </div>
            <div>
                <p className={styles.signUpParagraf}>{t('signUpPage.haveAccount')}&nbsp;
                    <Link to='/login' className={styles.signUpLink}>
                        {t('signUpPage.logInlink')}
                    </Link>
                </p>
            </div>
        </div>
    )
}