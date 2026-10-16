import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ru from './locales/ru/translation.json'
import en from './locales/en/translation.json'
import useAppStore from './store'

const currentLang = useAppStore.getState().language

i18n.use(initReactI18next).init({
    debug: true,
    fallbackLng: currentLang,
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: {
            translation: en,
        },
        ru: {
            translation: ru,
        },
    },
}) 

export default i18n