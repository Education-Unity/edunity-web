import { defineStore } from 'pinia'

interface User {
  id: string
  name: string
  email?: string
}

export const useAppStore = defineStore('app', {
  state: () => ({
    // Auth
    user: null as User | null,
    isAuthenticated: false,

    // Theme
    theme: 'light' as 'light' | 'dark',

    // Portal
    isPortalSidebarOpen: false,

    // Language
    language: 'en'
  }),

  actions: {
    // Auth
    login(userData: User) {
      this.user = userData
      this.isAuthenticated = true
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
    },

    // Theme
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },

    // Portal
    togglePortalSidebar() {
      this.isPortalSidebarOpen = !this.isPortalSidebarOpen
    },

    // Language
    setLanguage(lang: string) {
      this.language = lang
    }
  },

  persist: {
    key: 'app-storage',
    paths: ['user', 'isAuthenticated', 'theme', 'language']
  }
})
