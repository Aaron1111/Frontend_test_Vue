import { defineStore } from "pinia";

const STORE_NAME = "bearer_token"

export const useAuthStore = defineStore("token", {
    state: () => {
        return {
            token : localStorage.getItem(STORE_NAME)
        };
    },
    actions: {
        saveToken (authToken) {
            this.token = authToken
            localStorage.setItem(STORE_NAME, this.token)
        }
     },
     getters: {
        bearer : (state) => localStorage.getItem(STORE_NAME)

     }
})