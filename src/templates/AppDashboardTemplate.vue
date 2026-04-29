<template>
  <div class="dashboard-layout">
    <AppSidebar :is-open="sidebarOpen" @toggle="toggleSidebar" />

    <div class="dashboard-main" :class="{ 'sidebar-collapsed': !sidebarOpen }">
      <div class="dashboard-header">
        <v-btn
          icon
          variant="text"
          @click="toggleSidebar"
          class="menu-toggle"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <div class="header-right">
          <v-badge color="error" dot bordered>
            <v-icon size="24" color="#64748b">mdi-bell-outline</v-icon>
          </v-badge>

          <v-menu location="bottom" offset="10px">
            <template v-slot:activator="{ props }">
              <div class="user-menu" v-bind="props">
                <v-avatar size="40" color="#4A90E2">
                  <v-icon color="white">mdi-account</v-icon>
                </v-avatar>
                <div class="user-info">
                  <span class="user-name">Alex Johnson</span>
                  <span class="user-role">Student</span>
                </div>
                <v-icon size="20" color="#64748b">mdi-chevron-down</v-icon>
              </div>
            </template>
            <v-list>
              <v-list-item to="/dashboard/profile">
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item>
              <v-list-item to="/dashboard/settings">
                <v-list-item-title>Settings</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item to="/logout">
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>

      <div class="dashboard-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppSidebar from './AppSidebar.vue';

const sidebarOpen = ref(true);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>

<style lang="scss" scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #000000;
}

.dashboard-main {
  flex: 1;
  margin-left: 280px;
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;

  &.sidebar-collapsed {
    margin-left: 80px;
  }

  .dashboard-header {
    background: #0a0a0a;
    border-bottom: 1px solid #1a1a1a;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 10;

    .menu-toggle {
      color: #e0e0e0;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      .user-menu {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        padding: 0.25rem 0.75rem;
        border-radius: 2rem;
        transition: background 0.2s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .user-info {
          display: flex;
          flex-direction: column;

          .user-name {
            font-size: 0.9rem;
            font-weight: 500;
            color: #e0e0e0;
          }

          .user-role {
            font-size: 0.7rem;
            color: #64748b;
          }
        }
      }
    }
  }

  .dashboard-content {
    flex: 1;
    padding: 2rem;
    background: #000000;
    min-height: calc(100vh - 73px);
  }
}

@media (max-width: 768px) {
  .dashboard-main {
    margin-left: 80px;

    &.sidebar-collapsed {
      margin-left: 0;
    }

    .dashboard-header {
      padding: 1rem;

      .header-right .user-menu .user-info {
        display: none;
      }
    }

    .dashboard-content {
      padding: 1rem;
    }
  }
}
</style>
