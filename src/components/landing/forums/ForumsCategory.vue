<template>
  <HomeTemplate :isReactive="true">
    <div class="forum-category-page">
      <CustomBreadcrumb :items="breadcrumbItems" class="breadcrumb" />

      <div class="header">
        <p class="header-title">{{ forum.name }}</p>
        <p class="header-desc">{{ forum.description }}</p>
      </div>

      <div class="category-container">
        <main class="threads-main">
          <div class="threads-controls">
            <div class="search-bar">
              <input
                type="text"
                placeholder="Search threads..."
                v-model="searchQuery"
              />
            </div>

            <div class="filters">
              <select v-model="sortBy">
                <option value="latest">Latest Activity</option>
                <option value="hot">Hot</option>
                <option value="views">Most Views</option>
                <option value="unanswered">Unanswered</option>
              </select>

              <router-link :to="`/forums/category/${categoryId}/new`" class="new-thread-btn">
                <v-icon size="20">mdi-plus</v-icon> New Thread
              </router-link>
            </div>
          </div>

          <div class="threads-list">
            <div v-if="filteredThreads.length === 0" class="no-threads">
              <p>No threads found matching your criteria.</p>
            </div>

            <router-link
              v-for="thread in filteredThreads"
              :key="thread.id"
              :to="`/forums/thread/${thread.id}`"
              :class="['thread-row', { pinned: thread.isPinned, locked: thread.isLocked }]"
            >
              <div class="thread-main">
                <div class="thread-title">
                  <span v-if="thread.isPinned" class="pin-badge">📌</span>
                  <span v-if="thread.isLocked" class="lock-badge">🔒</span>
                  {{ thread.title }}
                </div>
                <div class="thread-author">
                  by <strong>{{ thread.author.name }}</strong> • {{ formatTime(thread.timestamp) }}
                </div>
              </div>

              <div class="thread-stats">
                <div class="stat">
                  <v-icon size="18">mdi-message-text</v-icon>
                  <span>{{ thread.replyCount }}</span>
                </div>
                <div class="stat">
                  <v-icon size="18">mdi-eye</v-icon>
                  <span>{{ thread.viewCount.toLocaleString() }}</span>
                </div>
              </div>

              <div v-if="thread.lastReply" class="last-reply">
                <v-avatar size="28">
                  <v-img :src="thread.author.avatar" />
                </v-avatar>
                <div>
                  <div class="reply-author">{{ thread.lastReply.author }}</div>
                  <div class="reply-time">{{ formatTime(thread.lastReply.timestamp) }}</div>
                </div>
              </div>
            </router-link>
          </div>

          <div class="pagination">
            <button :class="{ active: page === 1 }" @click="page = 1">1</button>
            <button @click="page = 2">2</button>
            <button @click="page = 3">3</button>
            <span>...</span>
            <button @click="page = 12">12</button>
          </div>
        </main>

        <aside class="category-sidebar">
          <LabelledContainer title="Forum Stats">
            <div class="stats-grid">
              <div>
                <strong>1,284</strong>
                <span>Threads</span>
              </div>
              <div>
                <strong>8,921</strong>
                <span>Posts</span>
              </div>
              <div>
                <strong>342</strong>
                <span>Members</span>
              </div>
              <div>
                <strong>48</strong>
                <span>Online Now</span>
              </div>
            </div>
          </LabelledContainer>

          <LabelledContainer title="Top Contributors This Week">
            <div class="top-contributors">
              <div v-for="user in topContributors" :key="user.name" class="contributor">
                <v-avatar size="36">
                  <v-img :src="user.avatar" />
                </v-avatar>
                <div>
                  <div class="name">{{ user.name }}</div>
                  <div class="posts">{{ user.count }} posts</div>
                </div>
              </div>
            </div>
          </LabelledContainer>
        </aside>
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import HomeTemplate from "@/templates/HomeTemplate.vue";
import LabelledContainer from "@/components/commons/LabelledContainer.vue";
import CustomBreadcrumb from "@/components/commons/CustomBreadcrumb.vue";

interface Thread {
  id: number;
  title: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  timestamp: string;
  replyCount: number;
  viewCount: number;
  lastReply?: {
    author: string;
    timestamp: string;
  };
  isPinned?: boolean;
  isLocked?: boolean;
}

interface SubForum {
  id: number;
  name: string;
  description: string;
}

const mockSubForums: Record<number, SubForum> = {
  1: {
    id: 1,
    name: "General Announcements",
    description: "Important updates from the Quizlash team",
  },
  4: {
    id: 4,
    name: "Lounge",
    description: "Off-topic discussions and casual chat",
  },
  7: { id: 7, name: "Questions", description: "Ask the community for help" },
  10: { id: 10, name: "Introductions", description: "New here? Say hello!" },
};

const mockThreads: Thread[] = [
  {
    id: 101,
    title: "[Pinned] Welcome to the Lounge - Please read before posting",
    author: {
      id: 1,
      name: "Alex Carter",
      avatar: "https://avatar.iran.liara.run/public/1",
    },
    timestamp: "2025-11-01T10:00:00Z",
    replyCount: 156,
    viewCount: 5432,
    isPinned: true,
  },
  {
    id: 102,
    title: "What are you quizzing today?",
    author: {
      id: 5,
      name: "Sarah Kim",
      avatar: "https://avatar.iran.liara.run/public/78",
    },
    timestamp: "2025-11-18T16:45:00Z",
    replyCount: 89,
    viewCount: 1245,
    lastReply: { author: "Leo Nakamura", timestamp: "2025-11-18T17:20:00Z" },
  },
  {
    id: 103,
    title: "Anyone using Quizlash in middle school science classes?",
    author: {
      id: 12,
      name: "Jordan Lee",
      avatar: "https://avatar.iran.liara.run/public/56",
    },
    timestamp: "2025-11-18T14:20:00Z",
    replyCount: 23,
    viewCount: 567,
    lastReply: { author: "Rachel Green", timestamp: "2025-11-18T16:10:00Z" },
  },
  {
    id: 104,
    title: "Feature idea: Dark mode for battles",
    author: {
      id: 8,
      name: "Emma Wilson",
      avatar: "https://avatar.iran.liara.run/public/67",
    },
    timestamp: "2025-11-17T09:30:00Z",
    replyCount: 45,
    viewCount: 892,
    isLocked: true,
  },
  {
    id: 105,
    title: "My students are addicted... help!",
    author: {
      id: 15,
      name: "Marcus Torres",
      avatar: "https://avatar.iran.liara.run/public/91",
    },
    timestamp: "2025-11-16T11:15:00Z",
    replyCount: 67,
    viewCount: 2103,
  },
];

const topContributors = [
  { name: "Alex Carter", count: 42, avatar: "https://avatar.iran.liara.run/public/1" },
  { name: "Sarah Kim", count: 38, avatar: "https://avatar.iran.liara.run/public/78" },
  { name: "Leo Nakamura", count: 29, avatar: "https://avatar.iran.liara.run/public/45" },
];

const route = useRoute();
const categoryId = computed(() => parseInt(route.params.categoryId as string || "0"));
const forum = computed(() => mockSubForums[categoryId.value] || mockSubForums[4]);

const breadcrumbItems = computed(() => [
  { label: "Forums", href: "/forums" },
  { label: forum.value.name }
]);

const searchQuery = ref("");
const sortBy = ref<"latest" | "hot" | "views" | "unanswered">("latest");
const page = ref(1);

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

const filteredThreads = computed(() => {
  let filtered = mockThreads.filter(t =>
    t.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    t.lastReply?.author.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  filtered.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;

    switch (sortBy.value) {
      case "latest":
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case "hot":
        return b.replyCount - a.replyCount || new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      case "views":
        return b.viewCount - a.viewCount;
      case "unanswered":
        return a.replyCount - b.replyCount;
      default:
        return 0;
    }
  });

  return filtered;
});
</script>

<style scoped lang="scss">
@use "@styles/common.scss" as *;

.forum-category-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #eef7ff);
  padding-bottom: 4rem;

  .breadcrumb {
    padding-top: 7rem;
  }

  .header {
    padding: 0 5rem;
    margin-bottom: 1rem;

    .header-title {
      font-size: 30px;
      font-weight: 600;
    }

    .header-desc {
      color: #64748b;
      margin-top: 0.5rem;
    }
  }

  .category-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 3rem;
  }

  .threads-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;

    .search-bar {
      input {
        padding: 0.75rem 1rem;
        border: 1px solid #cbd5e1;
        border-radius: 0.5rem;
        background-color: #FFF !important;
        color: #000;
        font-size: 1rem;
        width: 300px;
        max-width: 100%;
        transition: border 0.2s;

        &:focus {
          outline: none;
          border-color: $primary-color;
          box-shadow: 0 0 0 3px rgba($primary-color, 0.15);
        }
      }
    }

    .filters {
      display: flex;
      align-items: center;
      gap: 1rem;

      select {
        padding: 0.75rem 1rem;
        border: 1px solid #cbd5e1;
        border-radius: 0.5rem;
        color: #000;
        font-weight: 600;
        background: white;
        cursor: pointer;

        &:focus {
          outline: none;
          border-color: $primary-color;
        }
      }

      .new-thread-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: $primary-color;
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.2s;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba($primary-color, 0.3);
        }
      }
    }
  }

  .threads-list {
    background: white;
    border-radius: 0.6rem;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.07);

    .thread-row {
      display: grid;
      grid-template-columns: 1fr 120px 180px;
      padding: 1.4rem 2rem;
      border-bottom: 1px solid #f1f5f9;
      text-decoration: none;
      color: inherit;
      transition: background 0.2s;

      &:hover {
        background: #f8fafc;
      }

      &.pinned {
        background: #fffbeb;
        border-left: 4px solid #f59e0b;
      }

      &.locked {
        opacity: 0.8;
      }

      .thread-main {
        .thread-title {
          font-size: 1.15rem;
          font-weight: 600;
          margin-bottom: 0.4rem;
          color: #1e293b;

          .pin-badge, .lock-badge {
            font-size: 1.1rem;
            margin-right: 0.5rem;
          }
        }

        .thread-author {
          font-size: 0.9rem;
          color: #64748b;
        }
      }

      .thread-stats {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        color: #475569;

        .stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;

          .v-icon {
            color: #94a3b8;
          }
        }
      }

      .last-reply {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 0.9rem;

        .reply-author {
          font-weight: 600;
          color: #1e293b;
        }

        .reply-time {
          color: #64748b;
        }
      }
    }

    .no-threads {
      text-align: center;
      padding: 4rem 2rem;
      color: #64748b;
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    margin-top: 2rem;

    button, span {
      padding: 0.5rem 0.9rem;
      border: 1px solid #cbd5e1;
      background: white;
      border-radius: 0.4rem;
      cursor: pointer;
      transition: all 0.2s;

      &.active {
        background: $primary-color;
        color: white;
        border-color: $primary-color;
      }

      &:hover:not(.active) {
        background: #f1f5f9;
      }
    }
  }

  .category-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      text-align: center;

      div {
        strong {
          display: block;
          font-size: 1.5rem;
          color: $primary-color;
        }
        span {
          font-size: 0.9rem;
          color: #64748b;
        }
      }
    }

    .top-contributors {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .contributor {
        display: flex;
        align-items: center;
        gap: 1rem;

        .name {
          font-weight: 600;
        }
        .posts {
          font-size: 0.85rem;
          color: #64748b;
        }
      }
    }
  }

  @media (max-width: 1100px) {
    .category-container {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .header {
      padding: 0 2rem;
    }

    .threads-controls {
      flex-direction: column;
      align-items: stretch;

      .search-bar input {
        width: 100%;
      }

      .filters {
        justify-content: space-between;
      }
    }

    .thread-row {
      grid-template-columns: 1fr !important;
      gap: 1rem;

      .thread-stats,
      .last-reply {
        order: 3;
        justify-content: flex-start;
      }

      .last-reply {
        padding-top: 0.5rem;
        border-top: 1px dashed #e2e8f0;
      }
    }
  }
}
</style>
