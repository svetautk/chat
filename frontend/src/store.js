import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAppStore = create(
    persist(
        (set) => ({
            userData: null,
            activeChannel: { id: '1', name: 'general', removable: false, },
            activeModal: null,
            addUserData: (newUserData) => set( { userData: newUserData } ),
            setActiveChannel: (newActiveChannel) => set( { activeChannel: newActiveChannel } ),
            setActiveModal: (newActiveModal) => set( { activeModal: newActiveModal } ),
        }), 
        {
            name: 'appStore',
            partialize: (state) => ( { userData: state.userData, activeChannel: state.activeChannel, } )
        
        },
    ))

export default useAppStore