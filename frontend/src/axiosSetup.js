import axios from 'axios'
import queryClient from './queryClient.js'
import useAppStore from './store'

const addUserData = useAppStore.getState().addUserData
const setActiveChannel = useAppStore.getState().setActiveChannel
const userData = useAppStore.getState().userData

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !error.config?.url.includes('/login') && userData) {
            addUserData(null)
            queryClient.clear()
            setActiveChannel({ id: '1', name: 'general', removable: false, })
        }
        return Promise.reject(error)
    }
) 