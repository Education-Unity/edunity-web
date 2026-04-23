<template>
  <HomeTemplate>
    <div class="blog-article-page">
      <div class="article-container">
        <div class="article-search">
          <div class="search-box">
            <input
              class="search-input"
              placeholder="Search articles..."
              v-model="query"
            />
            <v-btn icon class="search-btn">
              <v-icon icon="mdi-magnify" />
            </v-btn>
          </div>

          <div v-if="query" class="search-results">
            <div
              v-for="item in filteredArticles"
              :key="item.id"
              class="search-result-item"
              @click="goToArticle(item.id)"
            >
              {{ item.title }}
            </div>

            <div
              v-if="filteredArticles.length === 0"
              class="search-empty"
            >
              No matching results.
            </div>
          </div>
        </div>

        <div class="article-body">
          <div class="article-left">
            <CustomBreadcrumb
              :items="[
                { label: 'Blogs', href: '/blogs' },
                { label: article.title }
              ]"
            />

            <img
              :src="article.img"
              :alt="article.title"
              class="article-banner"
            />

            <h1 class="article-title">{{ article.title }}</h1>

            <div class="article-meta">
              <span>{{ article.date }}</span>
              <span>•</span>
              <span>{{ article.readTime }} read</span>
              <span>•</span>
              <span class="article-tag">{{ article.tag }}</span>
            </div>

            <p class="article-content">
              {{ article.content }}
            </p>
          </div>

          <div class="article-right">
            <LabelledContainer className="author-card">
              <template #title>
                <h3>About the Author</h3>
              </template>

              <div class="author-profile">
                <v-avatar size="60" class="author-avatar">
                  <img :src="article.author.avatar" />
                </v-avatar>

                <div>
                  <div class="author-name">
                    {{ article.author.name }}
                  </div>
                  <div class="author-bio">
                    {{ article.author.bio }}
                  </div>
                </div>
              </div>
            </LabelledContainer>

            <LabelledContainer className="related-card">
              <template #title>
                <h3>Related Articles</h3>
              </template>

              <div class="related-items">
                <p
                  v-if="related.length === 0"
                  class="no-related"
                >
                  No related articles available.
                </p>

                <div
                  v-for="item in related"
                  :key="item.id"
                  class="related-item"
                  @click="goToArticle(item.id)"
                >
                  <img :src="item.img" />
                  <div>
                    <div class="related-title">
                      {{ item.title }}
                    </div>
                    <div class="related-date">
                      {{ item.date }}
                    </div>
                  </div>
                </div>
              </div>
            </LabelledContainer>
          </div>
        </div>
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import HomeTemplate from "@/templates/HomeTemplate.vue";
import LabelledContainer from "@/components/commons/LabelledContainer.vue";
import CustomBreadcrumb from "@/components/commons/CustomBreadcrumb.vue";

type Author = {
  name: string;
  avatar: string;
  bio: string;
};

type Article = {
  id: number;
  title: string;
  content: string;
  img: string;
  date: string;
  tag: string;
  readTime: string;
  author: Author;
};

const route = useRoute();
const router = useRouter();
const query = ref("");

const articles: Article[] = [
  {
    id: 1,
    title: "Launching Edunity Beta",
    content:
      "Edunity Beta represents the first step toward a more interactive learning future...",
    img: "https://placeholder.vn/placeholder/640x360?text=Beta+Launch",
    date: "March 15, 2025",
    tag: "Updates",
    readTime: "6 min",
    author: {
      name: "Alex Carter",
      avatar: "https://placeholder.vn/placeholder/80x80?text=AC",
      bio: "Founder & CEO of Edunity, passionate about shaping gamified learning systems.",
    },
  },
  {
    id: 2,
    title: "Why Gamified Learning Works",
    content:
      "Gamification activates reward pathways in the brain that significantly increase motivation...",
    img: "https://placeholder.vn/placeholder/640x360?text=Gamified+Learning",
    date: "March 2, 2025",
    tag: "Education",
    readTime: "4 min",
    author: {
      name: "Maya Singh",
      avatar: "https://placeholder.vn/placeholder/80x80?text=MS",
      bio: "CTO of Edunity, driving innovation in AI-based learning solutions.",
    },
  },
  {
    id: 3,
    title: "AI-Powered Quiz Creation",
    content:
      "Edunity’s AI-assisted creation tools streamline the process of building high-quality questions...",
    img: "https://placeholder.vn/placeholder/640x360?text=AI+Creation",
    date: "February 18, 2025",
    tag: "AI",
    readTime: "5 min",
    author: {
      name: "Leo Nakamura",
      avatar: "https://placeholder.vn/placeholder/80x80?text=LN",
      bio: "COO of Edunity, focusing on scalable growth and educational impact.",
    },
  },
];

const article = computed(() =>
  articles.find(a => a.id === Number(route.params.id))
);

const related = computed(() =>
  article.value
    ? articles.filter(
        a => a.tag === article.value!.tag && a.id !== article.value!.id
      )
    : []
);

const filteredArticles = computed(() => {
  if (!query.value.trim()) return [];
  const q = query.value.toLowerCase();
  return articles.filter(
    a =>
      a.title.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.tag.toLowerCase().includes(q) ||
      a.author.name.toLowerCase().includes(q)
  );
});

function goToArticle(id: number) {
  router.push(`/blog/${id}`);
}
</script>

<style lang="scss" scoped>
@use "@styles/common.scss" as *;

@import "./BlogsArticlePage.scss";
</style>
