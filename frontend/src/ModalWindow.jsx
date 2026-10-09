import useAppStore from './store'
import ModalAddChannelWindow from './ModalAddChannelWindow.jsx'
import ModalDeleteChannelWindow from './ModalDeleteChannelWindow.jsx'
import ModalRenameChannelWindow from './ModalRenameChannelWindow.jsx'
import styles from './ModalWindow.module.css'

export default function ModalWindow() {
    const activeModal = useAppStore(state => state.activeModal)
    const setActiveModal = useAppStore(state => state.setActiveModal)
    
    const closeModal = (event) => {
        if (event.target.closest(`.${styles.modalContainer}`)) return
        setActiveModal(null)
    }

    const renderModal = () => {
        switch (activeModal) {
            case 'addChannelModalWindow': return <ModalAddChannelWindow/>
            case 'deleteChannelModalWindow': return <ModalDeleteChannelWindow/>
            case 'openModalRenameChannel': return <ModalRenameChannelWindow/>
        }
    }

    return (
        <>
            { activeModal ? (
            <div onClick={closeModal} className={styles.modalWindow}>
                {renderModal()}
            </div>) : null }
        </>
    )
}