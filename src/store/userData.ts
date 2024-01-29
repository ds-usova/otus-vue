import {defineStore} from "pinia";

export const useUserDataStore = defineStore('userData', {
    state: () => {
        return {
            username: ''
        }
    },
    getters: {
        loggedIn: state => state.username.length !== 0
    },
    actions: {
    },
    persist: {
        storage: localStorage
    }
})