import {defineStore} from "pinia";

export const useUserDataStore = defineStore('userData', {
    state: () => {
        return {
            username: ''
        }
    },
    getters: {
        loggedIn: state => state.username.length !== 0,
        isAdmin: state => state.username === 'admin'
    },
    actions: {
    },
    persist: {
        storage: localStorage
    }
})