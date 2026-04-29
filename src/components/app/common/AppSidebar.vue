<template>
  <div class="app-sidebar" :class="{ collapsed: !isOpen }">
    <div class="sidebar-header">
      <div class="logo-section">
        <v-icon v-if="isOpen" size="32" color="#4A90E2" class="logo-icon">mdi-school</v-icon>
        <v-icon v-else size="32" color="#4A90E2" class="logo-icon">mdi-school</v-icon>
        <span v-if="isOpen" class="logo-text">Edunity</span>
      </div>
    </div>

    <div class="sidebar-nav">
      <v-list class="nav-list" bg-color="transparent">
        <v-list-item
          v-for="item in navItems"
          :key="item.value"
          :to="item.to"
          :active="activeItem === item.value"
          @click="activeItem = item.value"
          class="nav-item"
          :class="{ active: activeItem === item.value }"
        >
          <template v-slot:prepend>
            <v-icon :color="activeItem === item.value ? '#4A90E2' : '#64748b'" size="24">
              {{ item.icon }}
            </v-icon>
          </template>
          <v-list-item-title v-if="isOpen" class="nav-title">
            {{ item.title }}
          </v-list-item-title>

          <template v-slot:append v-if="item.badge && isOpen">
            <v-chip size="small" :color="item.badgeColor" class="badge-chip">
              {{ item.badge }}
            </v-chip>
          </template>
        </v-list-item>
      </v-list>
    </div>

    <div class="sidebar-footer">
      <div class="progress-section" v-if="isOpen">
        <div class="progress-label">
          <span>Course Progress</span>
          <span>65%</span>
        </div>
        <v-progress-linear
          v-model="courseProgress"
          color="#4A90E2"
          height="6"
          rounded
        ></v-progress-linear>
      </div>

      <v-list class="footer-list" bg-color="transparent">
        <v-list-item to="/dashboard/help" class="nav-item">
          <template v-slot:prepend>
            <v-icon size="24" color="#64748b">mdi-help-circle-outline</v-icon>
          </template>
          <v-list-item-title v-if="isOpen">Help & Support</v-list-item-title>
        </v-list-item>

        <v-list-item to="/settings" class="nav-item">
          <template v-slot:prepend>
            <v-icon size="24" color="#64748b">mdi-logout</v-icon>
          </template>
          <v-list-item-title v-if="isOpen">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  isOpen: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['toggle']);

const activeItem = ref('summary');
const courseProgress = ref(65);

const navItems = [
  {
    value: 'summary',
    title: 'Summary',
    icon: 'mdi-view-dashboard',
    to: '/dashboard/summary'
  },
  {
    value: 'my-classes',
    title: 'My Classes',
    icon: 'mdi-book-open-variant',
    to: '/dashboard/classes',
    badge: '3',
    badgeColor: '#4A90E2'
  },
  {
    value: 'my-resources',
    title: 'My Resources',
    icon: 'mdi-folder-multiple',
    to: '/dashboard/resources'
  },
  {
    value: 'assignments',
    title: 'Assignments',
    icon: 'mdi-clipboard-list',
    to: '/dashboard/assignments',
    badge: '2',
    badgeColor: '#F5A623'
  },
  {
    value: 'check-in',
    title: 'Check-in',
    icon: 'mdi-calendar-check',
    to: '/dashboard/checkin'
  },
  {
    value: 'calendar',
    title: 'Calendar',
    icon: 'mdi-calendar-month',
    to: '/dashboard/calendar'
  },
  {
    value: 'history',
    title: 'History',
    icon: 'mdi-history',
    to: '/dashboard/history'
  },
  {
    value: 'grades',
    title: 'Grades',
    icon: 'mdi-chart-line',
    to: '/dashboard/grades'
  },
  {
    value: 'discussions',
    title: 'Discussions',
    icon: 'mdi-forum',
    to: '/dashboard/discussions',
    badge: '5',
    badgeColor: '#50E3C2'
  },
  {
    value: 'achievements',
    title: 'Achievements',
    icon: 'mdi-trophy',
    to: '/dashboard/achievements'
  }
];
</script>

<style lang="scss" scoped>
.app-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 280px;
  background: linear-gradient(180deg, #0a0a0a 0%, #050505 100%);
  border-right: 1px solid #1a1a1a;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 20;
  overflow-x: hidden;

  &.collapsed {
    width: 80px;

    .sidebar-header .logo-section {
      justify-content: center;
      padding: 0;

      .logo-text {
        display: none;
      }
    }

    .nav-item {
      justify-content: center;
      padding: 0.75rem !important;

      .v-list-item__prepend {
        margin-right: 0;
      }

      .nav-title {
        display: none;
      }
    }

    .sidebar-footer .progress-section {
      display: none;
    }

    .footer-list .nav-item .v-list-item__title {
      display: none;
    }
  }

  .sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid #1a1a1a;
    margin-bottom: 2rem;

    .logo-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .logo-icon {
        flex-shrink: 0;
      }

      .logo-text {
        font-size: 1.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #4A90E2, #50E3C2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
      }
    }
  }

  .sidebar-nav {
    flex: 1;
    padding: 0 0.75rem;

    .nav-list {
      .nav-item {
        margin-bottom: 0.5rem;
        border-radius: 0.75rem;
        transition: all 0.2s ease;

        :deep(.v-list-item__prepend) {
          margin-right: 1rem;
        }

        .nav-title {
          font-size: 0.95rem;
          font-weight: 500;
          color: #cbd5e1;
        }

        &:hover {
          background: rgba(74, 144, 226, 0.1);

          .nav-title {
            color: #4A90E2;
          }
        }

        &.active {
          background: linear-gradient(135deg, rgba(74, 144, 226, 0.15), rgba(80, 227, 194, 0.05));

          .nav-title {
            color: #4A90E2;
            font-weight: 600;
          }
        }

        .badge-chip {
          font-size: 0.7rem;
          font-weight: 600;
        }
      }
    }
  }

  .sidebar-footer {
    padding: 1.5rem 0.75rem;
    border-top: 1px solid #1a1a1a;

    .progress-section {
      padding: 0 0.75rem;
      margin-bottom: 1.5rem;

      .progress-label {
        display: flex;
        justify-content: space-between;
        font-size: 0.75rem;
        color: #64748b;
        margin-bottom: 0.5rem;

        span:first-child {
          color: #cbd5e1;
        }
      }
    }

    .footer-list {
      .nav-item {
        border-radius: 0.75rem;
        transition: all 0.2s ease;

        :deep(.v-list-item__prepend) {
          margin-right: 1rem;
        }

        &:hover {
          background: rgba(74, 144, 226, 0.1);
        }
      }
    }
  }
}

:deep(.v-list-item__title) {
  font-size: 0.95rem;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: #1a1a1a;
  border-radius: 2px;

  &:hover {
    background: #2a2a2a;
  }
}
</style>
