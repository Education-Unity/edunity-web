import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    isLoggedIn: false,
    allowRememberMe: false
  }),

  actions: {
    setToken(token: string) {
      this.token = token
      this.isLoggedIn = !!token
    },

    getToken(): string {
      return this.token ?? ''
    },

    setAllowRememberMe(allow: boolean) {
      this.allowRememberMe = allow
    },

    getAllowRememberMe(): boolean {
      return this.allowRememberMe
    },

    clearAuth() {
      this.token = null
      this.isLoggedIn = false
    }
  },

  persist: {
    key: 'auth-storage'
  }
})
