<template>
  <HomeTemplate :isReactive="true">
    <div class="forums-home">
      <div class="forums-header">
        <h1 class="forums-title">Community Forums</h1>
        <p class="forums-subtitle">Connect, share, and learn with educators worldwide</p>
      </div>

      <div class="forums-container">
        <main class="forums-main">
          <section v-for="category in categories" :key="category.id" class="category-section">
            <div class="category-header">
              <div class="category-title">
                <span class="category-icon">{{ category.icon }}</span>
                <h2>{{ category.name }}</h2>
              </div>
            </div>

            <div class="subforums-list">
              <router-link
                v-for="forum in category.subForums"
                :key="forum.id"
                :to="`/forums/category/${forum.id}`"
                class="subforum-row"
              >
                <div class="subforum-info">
                  <div class="subforum-name">{{ forum.name }}</div>
                  <div class="subforum-desc">{{ forum.description }}</div>
                </div>

                <div class="subforum-stats">
                  <div class="stat-item">
                    <v-icon size="20" class="stat-icon">mdi-forum</v-icon>
                    <span>{{ forum.threadCount.toLocaleString() }}</span>
                  </div>
                  <div class="stat-item">
                    <v-icon size="20" class="stat-icon">mdi-message-text</v-icon>
                    <span>{{ forum.postCount.toLocaleString() }}</span>
                  </div>
                </div>

                <div class="subforum-latest">
                  <div v-if="forum.latestPost" class="latest-post">
                    <v-avatar size="32">
                      <v-img v-if="forum.latestPost.author.avatar" :src="forum.latestPost.author.avatar" />
                      <span v-else class="avatar-placeholder">{{ forum.latestPost.author.name.charAt(0).toUpperCase() }}</span>
                    </v-avatar>
                    <div class="latest-info">
                      <div class="latest-title">{{ forum.latestPost.title }}</div>
                      <div class="latest-meta">
                        by <strong>{{ forum.latestPost.author.name }}</strong> • {{ formatTime(forum.latestPost.timestamp) }}
                      </div>
                    </div>
                  </div>
                  <div v-else class="no-posts">No posts yet</div>
                </div>
              </router-link>
            </div>
          </section>
        </main>

        <aside class="forums-sidebar">
          <LabelledContainer title="Top contributors today">
            <p class="no-activity">No recent activity</p>
          </LabelledContainer>

          <LabelledContainer title="Currently online" class="currently-online">
            <div class="online-avatars">
              <v-avatar v-for="i in 8" :key="i" size="40" class="online-avatar">
                <v-img :src="`https://avatar.iran.liara.run/public/${i + 10}`" />
              </v-avatar>
              <div class="more-avatars">+{{ onlineUsers - 8 }}</div>
            </div>
          </LabelledContainer>

          <LabelledContainer title="Recent threads" class="recent-thread">
            <p class="no-activity">No recent thread</p>
          </LabelledContainer>

          <LabelledContainer title="Activities today" class="recent-thread">
            <p class="no-activity">No recent activity</p>
          </LabelledContainer>
        </aside>
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup lang="ts">
import HomeTemplate from "@/templates/HomeTemplate.vue";
import LabelledContainer from "@/components/commons/LabelledContainer.vue";

interface LatestPost {
  title: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  timestamp: string;
  threadId: number;
}

interface SubForum {
  id: number;
  name: string;
  description: string;
  threadCount: number;
  postCount: number;
  latestPost?: LatestPost;
}

interface MainCategory {
  id: number;
  name: string;
  icon: string;
  subForums: SubForum[];
}

const categories: MainCategory[] = [
  {
    id: 1,
    name: "Announcements",
    icon: "📢",
    subForums: [
      {
        id: 1,
        name: "General Announcements",
        description: "Important updates from the Quizlash team",
        threadCount: 8,
        postCount: 24,
        latestPost: {
          title: "Quizlash Beta is now live!",
          author: {
            id: 1,
            name: "Alex Carter",
            avatar: "https://avatar.iran.liara.run/public/1",
          },
          timestamp: "2025-11-18T14:30:00Z",
          threadId: 101,
        },
      },
      {
        id: 2,
        name: "Changelogs",
        description: "Detailed release notes and version history",
        threadCount: 15,
        postCount: 89,
        latestPost: {
          title: "v1.4.2 - AI question improvements & bug fixes",
          author: {
            id: 2,
            name: "Maya Singh",
            avatar: "https://avatar.iran.liara.run/public/22",
          },
          timestamp: "2025-11-17T10:15:00Z",
          threadId: 102,
        },
      },
      {
        id: 3,
        name: "Event Announcements",
        description: "Tournaments, webinars, and community events",
        threadCount: 4,
        postCount: 67,
        latestPost: {
          title: "December Global Quiz Battle - $500 Prize Pool",
          author: {
            id: 1,
            name: "Alex Carter",
            avatar: "https://avatar.iran.liara.run/public/1",
          },
          timestamp: "2025-11-16T09:00:00Z",
          threadId: 103,
        },
      },
    ],
  },
  {
    id: 2,
    name: "General",
    icon: "💬",
    subForums: [
      {
        id: 4,
        name: "Lounge",
        description: "Off-topic discussions and casual chat",
        threadCount: 156,
        postCount: 2893,
        latestPost: {
          title: "What are you quizzing today?",
          author: {
            id: 5,
            name: "Sarah Kim",
            avatar: "https://avatar.iran.liara.run/public/78",
          },
          timestamp: "2025-11-18T16:45:00Z",
          threadId: 201,
        },
      },
      {
        id: 5,
        name: "Showcase",
        description: "Share your best quiz battles and creations",
        threadCount: 67,
        postCount: 512,
        latestPost: {
          title: "My students broke the leaderboard with 98% accuracy!",
          author: {
            id: 3,
            name: "Leo Nakamura",
            avatar: "https://avatar.iran.liara.run/public/45",
          },
          timestamp: "2025-11-18T12:20:00Z",
          threadId: 202,
        },
      },
      {
        id: 6,
        name: "Tips & Tricks",
        description: "Share teaching strategies and Quizlash hacks",
        threadCount: 89,
        postCount: 734,
      },
    ],
  },
  {
    id: 3,
    name: "Help & Support",
    icon: "❓",
    subForums: [
      {
        id: 7,
        name: "Questions",
        description: "Ask the community for help",
        threadCount: 123,
        postCount: 892,
        latestPost: {
          title: "How do I export battle results to Google Sheets?",
          author: {
            id: 8,
            name: "Emma Wilson",
            avatar: "https://avatar.iran.liara.run/public/67",
          },
          timestamp: "2025-11-18T15:10:00Z",
          threadId: 301,
        },
      },
      {
        id: 8,
        name: "Bug Reports",
        description: "Report issues you're experiencing",
        threadCount: 45,
        postCount: 278,
      },
      {
        id: 9,
        name: "Feature Requests",
        description: "Suggest new ideas for Quizlash",
        threadCount: 98,
        postCount: 645,
        latestPost: {
          title: "Request: Custom timer per question",
          author: {
            id: 10,
            name: "David Chen",
            avatar: "https://avatar.iran.liara.run/public/89",
          },
          timestamp: "2025-11-18T11:30:00Z",
          threadId: 302,
        },
      },
    ],
  },
  {
    id: 4,
    name: "Community",
    icon: "❤️",
    subForums: [
      {
        id: 10,
        name: "Introductions",
        description: "New here? Say hello!",
        threadCount: 134,
        postCount: 567,
        latestPost: {
          title: "Hey everyone! History teacher from Canada here",
          author: {
            id: 11,
            name: "Rachel Green",
            avatar: "https://avatar.iran.liara.run/public/34",
          },
          timestamp: "2025-11-18T17:05:00Z",
          threadId: 401,
        },
      },
      {
        id: 11,
        name: "Feedback",
        description: "Tell us what you think about Quizlash",
        threadCount: 78,
        postCount: 456,
      },
    ],
  },
];

const onlineUsers = 48;

const formatTime = (iso: string): string => {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};
</script>

<style scoped lang="scss">
@use "./ForumsHome.scss" as *;
</style>
