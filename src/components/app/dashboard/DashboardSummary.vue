<template>
  <div class="summary-page">
    <div class="welcome-section">
      <h1>Welcome back, Alex! 👋</h1>
      <p>Here's what's happening with your courses today</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card" v-for="stat in stats" :key="stat.label">
        <div class="stat-icon" :style="{ backgroundColor: stat.bgColor }">
          <v-icon :color="stat.color">{{ stat.icon }}</v-icon>
        </div>
        <div class="stat-info">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <div class="recent-section">
      <div class="section-header">
        <h2>Recent Activity</h2>
        <v-btn variant="text" color="#4A90E2">View All</v-btn>
      </div>

      <div class="activity-list">
        <div class="activity-item" v-for="activity in recentActivities" :key="activity.id">
          <v-icon :color="activity.color">{{ activity.icon }}</v-icon>
          <div class="activity-content">
            <div class="activity-title">{{ activity.title }}</div>
            <div class="activity-time">{{ activity.time }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="upcoming-section">
      <div class="section-header">
        <h2>Upcoming Deadlines</h2>
        <v-btn variant="text" color="#4A90E2">Calendar</v-btn>
      </div>

      <div class="deadline-list">
        <div class="deadline-item" v-for="deadline in upcomingDeadlines" :key="deadline.id">
          <div class="deadline-date">
            <div class="deadline-day">{{ deadline.day }}</div>
            <div class="deadline-month">{{ deadline.month }}</div>
          </div>
          <div class="deadline-info">
            <div class="deadline-title">{{ deadline.title }}</div>
            <div class="deadline-course">{{ deadline.course }}</div>
          </div>
          <v-chip :color="deadline.statusColor" size="small">{{ deadline.status }}</v-chip>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const stats = ref([
  { icon: 'mdi-book-open-variant', label: 'Active Courses', value: '4', bgColor: 'rgba(74, 144, 226, 0.1)', color: '#4A90E2' },
  { icon: 'mdi-clipboard-list', label: 'Assignments', value: '3', bgColor: 'rgba(245, 166, 35, 0.1)', color: '#F5A623' },
  { icon: 'mdi-check-circle', label: 'Completed', value: '12', bgColor: 'rgba(80, 227, 194, 0.1)', color: '#50E3C2' },
  { icon: 'mdi-trophy', label: 'Achievements', value: '8', bgColor: 'rgba(144, 19, 254, 0.1)', color: '#9013FE' }
]);

const recentActivities = ref([
  { id: 1, icon: 'mdi-check-circle', title: 'Completed "Introduction to AI" module', time: '2 hours ago', color: '#50E3C2' },
  { id: 2, icon: 'mdi-upload', title: 'Submitted Math Assignment', time: '5 hours ago', color: '#4A90E2' },
  { id: 3, icon: 'mdi-message', title: 'New comment on your discussion post', time: '1 day ago', color: '#F5A623' },
  { id: 4, icon: 'mdi-star', title: 'Earned "Quick Learner" badge', time: '2 days ago', color: '#9013FE' }
]);

const upcomingDeadlines = ref([
  { id: 1, day: '15', month: 'May', title: 'Machine Learning Project', course: 'CS 401', status: 'Due Soon', statusColor: 'warning' },
  { id: 2, day: '18', month: 'May', title: 'Weekly Quiz', course: 'Mathematics', status: 'Pending', statusColor: 'info' },
  { id: 3, day: '22', month: 'May', title: 'Essay Submission', course: 'English Literature', status: 'Upcoming', statusColor: 'success' }
]);
</script>

<style lang="scss" scoped>
.summary-page {
  .welcome-section {
    margin-bottom: 2rem;

    h1 {
      font-size: 2rem;
      font-weight: 700;
      color: #e0e0e0;
      margin-bottom: 0.5rem;
    }

    p {
      color: #64748b;
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .stat-card {
      background: linear-gradient(135deg, #0a0a0a, #050505);
      border: 1px solid #1a1a1a;
      border-radius: 1rem;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        border-color: #4A90E2;
      }

      .stat-icon {
        width: 50px;
        height: 50px;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .stat-info {
        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: #e0e0e0;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #64748b;
        }
      }
    }
  }

  .recent-section,
  .upcoming-section {
    background: linear-gradient(135deg, #0a0a0a, #050505);
    border: 1px solid #1a1a1a;
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;

      h2 {
        font-size: 1.25rem;
        font-weight: 600;
        color: #e0e0e0;
      }
    }

    .activity-list {
      .activity-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 0;
        border-bottom: 1px solid #1a1a1a;

        &:last-child {
          border-bottom: none;
        }

        .activity-content {
          flex: 1;

          .activity-title {
            color: #cbd5e1;
            margin-bottom: 0.25rem;
          }

          .activity-time {
            font-size: 0.75rem;
            color: #64748b;
          }
        }
      }
    }

    .deadline-list {
      .deadline-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 0;
        border-bottom: 1px solid #1a1a1a;

        &:last-child {
          border-bottom: none;
        }

        .deadline-date {
          text-align: center;
          min-width: 50px;

          .deadline-day {
            font-size: 1.5rem;
            font-weight: 700;
            color: #4A90E2;
          }

          .deadline-month {
            font-size: 0.7rem;
            color: #64748b;
          }
        }

        .deadline-info {
          flex: 1;

          .deadline-title {
            color: #e0e0e0;
            font-weight: 500;
            margin-bottom: 0.25rem;
          }

          .deadline-course {
            font-size: 0.75rem;
            color: #64748b;
          }
        }
      }
    }
  }
}
</style>
