import useAppStore from './store'
import { useTranslation } from "react-i18next"
import styles from './ChatPage.module.css'
import Channels from "./Channels"
import ChatHeader from './ChatHeader'
import MessagesList from './MessagesList.jsx'
import MessageForm from './MessageForm.jsx'
import ModalWindow from './ModalWindow.jsx'

export default function ChatPage() {
    const setActiveModal = useAppStore(state => state.setActiveModal)
    const openModalAddChannel = () => setActiveModal('addChannelModalWindow')
    const { t } = useTranslation()

    return (
        <main>
            <div className={styles.mainBlock}>
                <section className={styles.channelsBlock}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                        <h2>{t('chatPage.channels')}</h2>
                        <button onClick={openModalAddChannel}
                            className={styles.plusButton}>+
                        </button>
                    </div>
                    <Channels/>
                </section>
                <section className={styles.chatSection}>
                    <ChatHeader/>
                    <MessagesList/>
                    <MessageForm/>
                </section>
            </div>
            <ModalWindow/>
        </main>
    )
}