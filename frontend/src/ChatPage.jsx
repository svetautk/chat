import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import useAppStore from './store'
import styles from './ChatPage.module.css'
import Channels from "./Channels"
import ChatHeader from './ChatHeader'
import MessagesList from './MessagesList.jsx'
import MessageForm from './MessageForm.jsx'
import ModalWindow from './ModalWindow.jsx'

const queryClient = new QueryClient()

export default function ChatPage() {
    const setActiveModal = useAppStore(state => state.setActiveModal)
    const openModalAddChannel = () => setActiveModal('addChannelModalWindow')

    return (
        <QueryClientProvider client={queryClient}>
            <main>
                <div className={styles.mainBlock}>
                    <section className={styles.channelsBlock}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                            <h2>Channels</h2>
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
        </QueryClientProvider>
    )
}