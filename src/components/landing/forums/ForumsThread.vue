<template>
  <HomeTemplate :isReactive="true">
    <div class="forum-thread-page">
      <CustomBreadcrumb :items="breadcrumbItems" class="thread-breadcrumb" />

      <div class="thread-header">
        <h1 class="thread-title">{{ thread.title }}</h1>
        <div class="thread-meta">
          <span>{{ thread.views.toLocaleString() }} views</span>
          <span>•</span>
          <span>{{ thread.replies }} replies</span>
          <span v-if="thread.locked" class="locked">🔒 Locked</span>
        </div>
      </div>

      <div class="thread-container">
        <main class="posts-main">
          <div class="posts-list">
            <div
              v-for="(post, index) in thread.posts"
              :key="post.id"
              :class="['post-card', { 'op-post': post.isOP }]"
            >
              <div class="vote-column">
                <button class="vote up" @click="handleVote(post.id, 'up')">
                  <v-icon size="20">mdi-arrow-up</v-icon>
                </button>
                <span class="vote-score">{{ post.upvotes - post.downvotes }}</span>
                <button class="vote down" @click="handleVote(post.id, 'down')">
                  <v-icon size="20">mdi-arrow-down</v-icon>
                </button>
              </div>

              <div class="post-content">
                <div class="post-header">
                  <router-link :to="`/profile/${post.author.id}`" class="author-info">
                    <v-avatar size="48">
                      <v-img :src="post.author.avatar" />
                    </v-avatar>
                    <div class="header-container">
                      <div class="author-name">{{ post.author.name }}</div>
                      <span v-if="post.isOP" class="op-badge">OP</span>
                    </div>
                  </router-link>
                  <div class="post-meta">
                    <span class="post-number">#{{ index + 1 }}</span>
                    <span>{{ formatTime(post.timestamp) }}</span>
                    <span v-if="post.edited" class="edited">
                      edited {{ formatTime(post.edited) }}
                    </span>
                  </div>
                </div>

                <div class="post-body" v-html="formatContent(post.content)" />

                <div class="post-actions">
                  <button class="action-btn" @click="scrollToReply">
                    <v-icon size="18">mdi-reply</v-icon> Reply
                  </button>
                  <button class="action-btn" @click="sharePost(post.id)">
                    <v-icon size="18">mdi-share-variant</v-icon> Share
                  </button>
                  <button class="action-btn more" @click="showPostMenu(post.id)">
                    <v-icon size="18">mdi-dots-horizontal</v-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="pagination">
            <button v-for="p in paginationPages" :key="p" :class="{ active: currentPage === p }" @click="currentPage = p">
              {{ p }}
            </button>
            <span v-if="showEllipsis">...</span>
            <button v-if="totalPages > 5" @click="currentPage = totalPages">{{ totalPages }}</button>
          </div>

          <div class="reply-box" ref="replyBoxRef">
            <v-avatar size="44">
              <v-img src="https://avatar.iran.liara.run/public/99" />
            </v-avatar>
            <div class="reply-field">
              <textarea
                v-model="replyContent"
                placeholder="Write your reply..."
                rows="4"
              />
              <div class="reply-actions">
                <button class="post-reply-btn" @click="submitReply">Post Reply</button>
                <span class="reply-note">Markdown supported • Be respectful</span>
              </div>
            </div>
          </div>
        </main>

        <aside class="thread-sidebar">
          <LabelledContainer title="Thread Info">
            <div class="thread-info">
              <div class="info-row">
                <span>Started by</span>
                <router-link :to="`/profile/${thread.author.id}`">
                  {{ thread.author.name }}
                </router-link>
              </div>
              <div class="info-row">
                <span>Created</span>
                <strong>{{ formatDate(thread.posts[0].timestamp) }}</strong>
              </div>
              <div class="info-row">
                <span>Replies</span>
                <strong>{{ thread.replies }}</strong>
              </div>
              <div class="info-row">
                <span>Views</span>
                <strong>{{ thread.views.toLocaleString() }}</strong>
              </div>
              <div class="info-row">
                <span>Last reply</span>
                <strong>{{ formatTime(thread.posts[thread.posts.length - 1].timestamp) }}</strong>
              </div>
            </div>
          </LabelledContainer>

          <LabelledContainer title="Top Contributors">
            <div class="top-contributors">
              <div v-for="(contributor, idx) in topContributors" :key="contributor.author.id" class="contributor-item">
                <div class="contributor-rank">{{ idx + 1 }}</div>
                <v-avatar size="36">
                  <v-img :src="contributor.author.avatar" />
                </v-avatar>
                <div class="contributor-info">
                  <router-link :to="`/profile/${contributor.author.id}`" class="contributor-name">
                    {{ contributor.author.name }}
                  </router-link>
                  <span class="contributor-count">{{ contributor.postCount }} posts</span>
                </div>
              </div>
            </div>
          </LabelledContainer>

          <LabelledContainer title="Similar Threads">
            <div class="similar-threads">
              <router-link v-for="similar in similarThreads" :key="similar.id" :to="`/forums/thread/${similar.id}`" class="similar-item">
                <div class="similar-title">{{ similar.title }}</div>
                <div class="similar-meta">{{ similar.replies }} replies • {{ similar.views }} views</div>
              </router-link>
            </div>
          </LabelledContainer>

          <LabelledContainer title="Share Thread">
            <div class="share-options">
              <button class="share-btn twitter" @click="shareOnTwitter">
                <v-icon size="18">mdi-twitter</v-icon> Twitter
              </button>
              <button class="share-btn facebook" @click="shareOnFacebook">
                <v-icon size="18">mdi-facebook</v-icon> Facebook
              </button>
              <button class="share-btn copy" @click="copyLink">
                <v-icon size="18">mdi-link-variant</v-icon> Copy Link
              </button>
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

interface Author {
  id: number;
  name: string;
  avatar: string;
  joined: string;
  posts: number;
}

interface Post {
  id: number;
  author: Author;
  content: string;
  timestamp: string;
  edited?: string;
  upvotes: number;
  downvotes: number;
  isOP?: boolean;
}

interface ThreadData {
  id: number;
  title: string;
  category: { id: number; name: string };
  author: Author;
  views: number;
  replies: number;
  locked: boolean;
  posts: Post[];
}

const mockThread: ThreadData = {
  id: 102,
  title: "What are you quizzing today?",
  category: { id: 4, name: "General" },
  author: {
    id: 5,
    name: "Sarah Kim",
    avatar: "https://avatar.iran.liara.run/public/78",
    joined: "2024-03-15",
    posts: 342,
  },
  views: 1245,
  replies: 89,
  locked: false,
  posts: [
    {
      id: 1001,
      author: {
        id: 5,
        name: "Sarah Kim",
        avatar: "https://avatar.iran.liara.run/public/78",
        joined: "2024-03-15",
        posts: 342,
      },
      content: "Hey everyone! Just curious — what topic or subject are you diving into with Quizlash today? I'm working on European History with my 10th graders and they're absolutely loving the battle mode! 🔥\n\nWhat's on your quiz list today?",
      timestamp: "2025-11-18T16:45:00Z",
      upvotes: 42,
      downvotes: 2,
      isOP: true,
    },
    {
      id: 1002,
      author: {
        id: 12,
        name: "Jordan Lee",
        avatar: "https://avatar.iran.liara.run/public/56",
        joined: "2024-06-20",
        posts: 189,
      },
      content: "Cell Biology! Just launched a new unit on mitosis and meiosis. The 3D animations in Quizlash are making it so much easier for students to visualize the phases. Highly recommend the Cell Division pack if anyone needs it!",
      timestamp: "2025-11-18T17:02:00Z",
      edited: "2025-11-18T17:05:00Z",
      upvotes: 28,
      downvotes: 0,
    },
    {
      id: 1003,
      author: {
        id: 8,
        name: "Emma Wilson",
        avatar: "https://avatar.iran.liara.run/public/67",
        joined: "2023-11-10",
        posts: 567,
      },
      content: "Spanish vocabulary with my middle schoolers. They're obsessed with beating each other's scores. It's chaos but the good kind 😂\n\nAlso using the new AI-generated questions feature — saves me HOURS of prep time.",
      timestamp: "2025-11-18T17:15:00Z",
      upvotes: 35,
      downvotes: 1,
    },
    {
      id: 1004,
      author: {
        id: 15,
        name: "Marcus Torres",
        avatar: "https://avatar.iran.liara.run/public/91",
        joined: "2025-01-05",
        posts: 78,
      },
      content: "Physics — specifically momentum and collisions. The real-time leaderboard is making my quietest students shout across the room. Never thought I'd see that!",
      timestamp: "2025-11-18T17:28:00Z",
      upvotes: 31,
      downvotes: 0,
    },
  ],
};

const route = useRoute();
const threadId = computed(() => route.params.threadId);
const thread = ref<ThreadData>(mockThread);
const replyContent = ref("");
const currentPage = ref(1);
const totalPages = ref(12);
const showEllipsis = computed(() => totalPages.value > 5 && currentPage.value < totalPages.value - 2);

const paginationPages = computed(() => {
  if (totalPages.value <= 5) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
  }
  if (currentPage.value <= 3) {
    return [1, 2, 3, 4, 5];
  }
  if (currentPage.value >= totalPages.value - 2) {
    return [totalPages.value - 4, totalPages.value - 3, totalPages.value - 2, totalPages.value - 1, totalPages.value];
  }
  return [currentPage.value - 2, currentPage.value - 1, currentPage.value, currentPage.value + 1, currentPage.value + 2];
});

const topContributors = computed(() => {
  const counts = new Map<number, { author: Author; postCount: number }>();
  thread.value.posts.forEach(post => {
    if (counts.has(post.author.id)) {
      counts.get(post.author.id)!.postCount++;
    } else {
      counts.set(post.author.id, { author: post.author, postCount: 1 });
    }
  });
  return Array.from(counts.values()).sort((a, b) => b.postCount - a.postCount).slice(0, 5);
});

const similarThreads = ref([
  { id: 201, title: "Best practices for creating engaging quizzes", replies: 45, views: 892 },
  { id: 202, title: "How to motivate struggling students?", replies: 67, views: 1243 },
  { id: 203, title: "Sharing my favorite question templates", replies: 23, views: 456 },
]);

const breadcrumbItems = computed(() => [
  { label: "Forums", href: "/forums" },
  { label: thread.value.category.name, href: `/forums/category/${thread.value.category.id}` },
  { label: thread.value.title },
]);

const replyBoxRef = ref<HTMLElement | null>(null);

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

const formatDate = (iso: string): string => {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatContent = (content: string): string => {
  return content.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em>$1</em>");
};

const handleVote = (postId: number, type: "up" | "down") => {
  const post = thread.value.posts.find(p => p.id === postId);
  if (post) {
    if (type === "up") {
      post.upvotes++;
    } else {
      post.downvotes++;
    }
  }
};

const scrollToReply = () => {
  replyBoxRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const submitReply = () => {
  if (!replyContent.value.trim()) {
    alert("Please enter your reply");
    return;
  }
  alert("Reply posted! (Demo mode)");
  replyContent.value = "";
};

const sharePost = (postId: number) => {
  navigator.clipboard.writeText(`${window.location.origin}/forums/thread/${threadId.value}?post=${postId}`);
  alert("Link copied to clipboard!");
};

const showPostMenu = (postId: number) => {
  alert("More options (Report, Edit, etc.) - Demo mode");
};

const shareOnTwitter = () => {
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(thread.value.title)}&url=${encodeURIComponent(window.location.href)}`, "_blank");
};

const shareOnFacebook = () => {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank");
};

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
  alert("Link copied to clipboard!");
};
</script>

<style scoped lang="scss">
@use "@styles/common.scss" as *;

.forum-thread-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #f0f9ff);
  padding-bottom: 6rem;

  .thread-breadcrumb {
    padding: 0 4rem;
    padding-top: 7rem;
    margin-bottom: 1.5rem;
  }

  .thread-header {
    padding: 0 4rem;
    padding-bottom: 20px;

    .thread-title {
      font-size: 2.3rem;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 0.5rem;
    }

    .thread-meta {
      font-size: 1rem;
      color: #64748b;
      display: flex;
      align-items: center;
      gap: 1rem;

      .locked {
        background: #dc2626;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.9rem;
      }
    }
  }

  .thread-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 3rem;
  }

  .posts-main {
    .posts-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .post-card {
      background: white;
      border-radius: 0.75rem;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
      display: flex;
      transition: transform 0.2s, box-shadow 0.2s;

      &:hover {
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
      }

      &.op-post {
        border-left: 4px solid $primary-color;
      }
    }

    .vote-column {
      background: #f8fafc;
      width: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1.5rem 0;
      gap: 0.5rem;

      .vote {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 0.5rem;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;

        &.up {
          color: $primary-color;
        }

        &.down {
          color: #dc2626;
        }

        &:hover {
          background: rgba($primary-color, 0.1);
          transform: scale(1.1);
        }

        &.down:hover {
          background: rgba(220, 38, 38, 0.1);
        }
      }

      .vote-score {
        font-weight: 700;
        font-size: 1.2rem;
        color: #1e293b;
      }
    }

    .post-content {
      flex: 1;
      padding: 1.5rem;

      .post-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 1rem;

        .author-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          color: inherit;

          .author-name {
            font-weight: 600;
            font-size: 1.1rem;
            color: #1e293b;

            &:hover {
              color: $primary-color;
            }
          }

          .header-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .op-badge {
            color: white;
            background: linear-gradient(to right, $primary-color, $quaternary-color);
            display: inline-block;
            padding: 0.2rem 0.6rem;
            border-radius: 0.4rem;
            font-size: 0.75rem;
            font-weight: 600;
          }
        }

        .post-meta {
          font-size: 0.9rem;
          color: #64748b;
          display: flex;
          align-items: center;
          gap: 1rem;

          .post-number {
            font-weight: 600;
            color: $primary-color;
          }

          .edited {
            font-style: italic;
            font-size: 0.85rem;
          }
        }
      }

      .post-body {
        font-size: 1.05rem;
        line-height: 1.7;
        color: #334155;
        margin-bottom: 1.5rem;
      }

      .post-actions {
        display: flex;
        gap: 1rem;
        border-top: 1px solid #e2e8f0;
        padding-top: 1rem;

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: #64748b;
          font-size: 0.9rem;
          cursor: pointer;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          transition: all 0.2s;

          &:hover {
            background: #f1f5f9;
            color: $primary-color;
          }
        }
      }
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.75rem;
      margin: 3rem 0;

      button, span {
        min-width: 40px;
        padding: 0.6rem 1rem;
        border: 1px solid #cbd5e1;
        background: white;
        border-radius: 0.5rem;
        color: #000;
        cursor: pointer;
        transition: all 0.2s;

        &.active {
          background: $primary-color;
          color: white;
          border-color: $primary-color;
        }

        &:hover:not(.active) {
          background: #f1f5f9;
          border-color: $primary-color;
        }
      }
    }

    .reply-box {
      background: white;
      border-radius: 1rem;
      padding: 1.5rem;
      display: flex;
      gap: 1rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

      .reply-field {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        textarea {
          width: 100%;
          padding: 1rem;
          border: 1px solid #cbd5e1;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-family: inherit;
          resize: vertical;
          transition: all 0.2s;

          &:focus {
            outline: none;
            border-color: $primary-color;
            box-shadow: 0 0 0 3px rgba($primary-color, 0.15);
          }
        }

        .reply-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .post-reply-btn {
          background: $primary-color;
          color: white;
          border: none;
          padding: 0.6rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba($primary-color, 0.3);
          }
        }

        .reply-note {
          font-size: 0.85rem;
          color: #94a3b8;
        }
      }
    }
  }

  .thread-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .thread-info {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .info-row {
        display: flex;
        justify-content: space-between;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e2e8f0;

        &:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        span:first-child {
          color: #64748b;
        }

        strong, a {
          font-weight: 600;
          color: #1e293b;
        }

        a {
          text-decoration: none;
          color: $primary-color;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .top-contributors {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .contributor-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        transition: background 0.2s;

        &:hover {
          background: #f8fafc;
        }

        .contributor-rank {
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, $primary-color, $quaternary-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
        }

        .contributor-info {
          flex: 1;
          display: flex;
          flex-direction: column;

          .contributor-name {
            font-weight: 600;
            font-size: 0.95rem;
            text-decoration: none;
            color: #1e293b;

            &:hover {
              color: $primary-color;
            }
          }

          .contributor-count {
            font-size: 0.8rem;
            color: #64748b;
          }
        }
      }
    }

    .similar-threads {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .similar-item {
        text-decoration: none;
        padding: 0.5rem;
        border-radius: 0.5rem;
        transition: background 0.2s;

        &:hover {
          background: #f8fafc;
        }

        .similar-title {
          font-weight: 600;
          font-size: 0.95rem;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .similar-meta {
          font-size: 0.8rem;
          color: #64748b;
        }
      }
    }

    .share-options {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      .share-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.6rem;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;

        &.twitter {
          background: #1da1f2;
          color: white;
          &:hover { background: #1a8cd8; }
        }

        &.facebook {
          background: #1877f2;
          color: white;
          &:hover { background: #1664d6; }
        }

        &.copy {
          background: #e2e8f0;
          color: #1e293b;
          &:hover { background: #cbd5e1; }
        }

        &:hover {
          transform: translateY(-1px);
        }
      }
    }
  }

  @media (max-width: 1100px) {
    .thread-container {
      grid-template-columns: 1fr;
    }

    .thread-sidebar {
      order: -1;
    }
  }

  @media (max-width: 768px) {
    .thread-breadcrumb {
      padding: 0 1rem;
      padding-top: 6rem;
    }

    .thread-header {
      padding: 0 1rem;
    }

    .thread-container {
      padding: 0 1rem;
    }

    .post-card {
      flex-direction: column;

      .vote-column {
        width: 100%;
        flex-direction: row;
        justify-content: center;
        padding: 0.75rem;
        gap: 1rem;
      }
    }

    .reply-box {
      flex-direction: column;

      .reply-field {
        .reply-actions {
          flex-direction: column;
          align-items: stretch;
        }
      }
    }
  }
}
</style>
