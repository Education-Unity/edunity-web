<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@stores/useAuthStore'
import logo from '@assets/logo.webp'

const props = defineProps<{
  isReactive?: boolean
}>()

const router = useRouter()
const { isLoggedIn, clearAuth, user } = useAuthStore()

const scrolled = ref(false)
const drawer = ref(false)
const notificationCount = ref(3)

const handleScroll = () => {
  scrolled.value = props.isReactive ? window.scrollY > 50 : true
}

onMounted(() => {
  if (props.isReactive !== false) {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  } else {
    scrolled.value = true
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const logout = () => {
  clearAuth()
  router.push('/')
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <v-app-bar :elevation="scrolled ? 4 : 0" :color="scrolled ? 'white' : 'transparent'" height="72" class="home-header">
    <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer" />

    <div class="header-left">
      <v-btn icon @click="goHome">
        <v-img :src="logo" alt="Edunity Logo" width="42" height="42" />
      </v-btn>

      <v-btn-stack class="nav-links d-none d-md-flex">
        <v-btn to="/" variant="text">Home</v-btn>
        <v-btn to="/about" variant="text">About</v-btn>
        <v-btn to="/community" variant="text">Community</v-btn>
        <v-btn to="/pricing" variant="text">Pricing</v-btn>
      </v-btn-stack>
    </div>

    <v-spacer />

    <div class="header-right">
      <template v-if="!isLoggedIn">
        <v-btn to="/login" variant="outlined" rounded>Login</v-btn>
      </template>

      <template v-else>
        <v-tooltip location="bottom">
          <template #activator="{ props: tooltipProps }">
            <v-badge :content="notificationCount" color="error" offset-x="8" offset-y="8">
              <v-btn icon v-bind="tooltipProps">
                <v-icon>mdi-bell-outline</v-icon>
              </v-btn>
            </v-badge>
          </template>
          <span>No new notifications</span>
        </v-tooltip>

        <v-menu>
          <template #activator="{ props: menuProps }">
            <v-btn v-bind="menuProps" variant="text" class="user-menu">
              <v-avatar size="32">
                <v-img v-if="user?.avatar" :src="user.avatar" />
                <template v-else>{{ user?.name?.charAt(0).toUpperCase() || 'U' }}</template>
              </v-avatar>
              <span class="ml-2">{{ user?.name || 'User' }}</span>
              <v-icon end>mdi-chevron-down</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item to="/portal" title="Portal" />
            <v-list-item to="/profile" title="Profile Settings" />
            <v-list-item @click="logout" title="Logout" class="text-error" />
          </v-list>
        </v-menu>
      </template>
    </div>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list nav>
      <v-list-item to="/" title="Home" />
      <v-list-item to="/about" title="About" />
      <v-list-item to="/community" title="Community" />
      <v-list-item to="/pricing" title="Pricing" />
      <v-divider class="my-2" />
      <v-list-item v-if="!isLoggedIn" to="/login" title="Login" />
      <template v-else>
        <v-list-item to="/portal" title="Portal" />
        <v-list-item to="/profile" title="Profile Settings" />
        <v-list-item @click="logout" title="Logout" class="text-error" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped lang="scss">
.home-header {
  padding: 0 1rem !important;
  
  .header-left,
  .header-right {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .header-left {
    min-width: fit-content;
  }

  .nav-links {
    gap: 0.5rem;
  }

  .user-menu {
    text-transform: none;
  }
}
</style>
