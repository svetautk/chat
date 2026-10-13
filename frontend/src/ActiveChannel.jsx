import { useEffect, useState, useRef } from 'react'
import useAppStore from './store'
import styles from './Channels.module.css'

export default function ActiveChannel( {item} ) {
    const setActiveModal = useAppStore(state => state.setActiveModal)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const buttonRef = useRef(null)

    const toggleDropDownMenu = () => setIsMenuOpen(!isMenuOpen)
    const openModalDeleteChannel = () => setActiveModal('deleteChannelModalWindow')
    const openModalRenameChannel = ()  => setActiveModal('openModalRenameChannel')

    useEffect(() => {
        if (!isMenuOpen) return

        const handleClickOutside = (event) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target) 
                && !buttonRef.current.contains(event.target)
             ) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => document.removeEventListener('click', handleClickOutside)

    }, [isMenuOpen])

    const renderButton = () => {
        if (item.removable) {
            return (<button ref={buttonRef} onClick={toggleDropDownMenu} 
                        className={styles.dropDownButton}>
                        &#x25BC;
                    </button>)
        }
        return null
    }

    const renderDropDownMenu = () => {
        if (item.removable && isMenuOpen) {
            return (<ul ref={menuRef} className={styles.dropDownMenu}>
                        <li>
                            <button onClick={openModalDeleteChannel} className={styles.menuItem}>
                                Delete
                            </button>
                        </li>
                        <li>
                            <button onClick={openModalRenameChannel} className={styles.menuItem}>
                                Rename
                            </button>
                        </li>
                    </ul>)
        }
        return null
    }

    return (
            <li id={item.id} className={styles.channelItem}>
                <div className={`${styles.channelRow} ${styles.activeChannel}`}>
                    <p className={styles.channelName}># {item.name}</p>
                    {renderButton()}
                </div>
                <div className={styles.menuContainer}>
                    {renderDropDownMenu()}
                </div>
            </li>
        )
}