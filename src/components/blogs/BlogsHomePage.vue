<template>
  <HomeTemplate>
    <div class="blog-homepage">
      <div class="blog-container">

        <div class="blog-banner">
          <div
            class="banner-image-wrapper"
            @click="goToBanner"
          >
            <img
              :src="banners[currentBanner].img"
              :alt="banners[currentBanner].title"
              class="banner-image"
            />
            <div class="banner-overlay">
              <h1>{{ banners[currentBanner].title }}</h1>
            </div>
          </div>

          <button
            class="banner-nav left"
            aria-label="Previous banner"
            @click="prevBanner"
          >
            ‹
          </button>
          <button
            class="banner-nav right"
            aria-label="Next banner"
            @click="nextBanner"
          >
            ›
          </button>

          <div class="banner-indicators">
            <div
              v-for="(_, i) in banners"
              :key="i"
              class="dot"
              :class="{ active: i === currentBanner }"
              @click="currentBanner = i"
            />
          </div>
        </div>

        <div class="blog-search">
          <div class="search-box">
            <span class="material-icons">search</span>
            <input
              type="text"
              class="search-input"
              placeholder="Search articles, tags, author..."
              v-model="query"
            />
          </div>
        </div>

        <div class="blog-articles">
          <h2 class="articles-title">Latest Articles</h2>

          <div class="articles-grid">
            <div
              v-for="article in visibleArticles"
              :key="article.id"
              class="article-card"
              @click="goToArticle(article.id)"
            >
              <div class="article-image-container">
                <img
                  :src="article.img"
                  :alt="article.title"
                  class="article-image"
                />
              </div>

              <div class="article-top">
                <div class="author">
                  <img
                    :src="article.author.avatar"
                    :alt="article.author.name"
                    class="author-avatar"
                  />
                  <div class="author-info">
                    <div class="author-name">{{ article.author.name }}</div>
                    <div class="article-date">{{ article.date }}</div>
                  </div>
                </div>

                <div class="article-tag">{{ article.tag }}</div>
              </div>

              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-preview">{{ article.preview }}</p>
            </div>
          </div>

          <div
            v-if="visibleCount < filteredArticles.length"
            class="load-more-container"
          >
            <button @click="loadMore">
              Load more articles
            </button>
          </div>

          <div
            v-if="filteredArticles.length === 0"
            class="no-results"
          >
            No articles match your search.
          </div>
        </div>

      </div>
    </div>
  </HomeTemplate>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import HomeTemplate from "@/templates/HomeTemplate";

const router = useRouter();

const banners = [
  {
    id: 1,
    img: "https://placeholder.vn/placeholder/640x360?text=Edunity+Update+1",
    title: "Edunity 2025: New Minigames & Classroom Tools",
  },
  {
    id: 2,
    img: "https://placeholder.vn/placeholder/640x360?text=Education+Reimagined",
    title: "Reimagining the Future of Classroom Engagement",
  },
  {
    id: 3,
    img: "https://placeholder.vn/placeholder/640x360?text=AI+in+Education",
    title: "How AI Helps Students Learn Faster & Smarter",
  },
];

const allArticles = [
  {
    id: 1,
    title: "Launching Edunity Beta",
    preview:
      "Our beta introduced interactive quiz battles, AI questions, and a new layer of gamified learning.",
    img: "https://placeholder.vn/placeholder/640x360?text=Beta+Launch",
    date: "March 15, 2025",
    tag: "Updates",
    author: {
      name: "Alex Carter",
      avatar: "https://placeholder.vn/placeholder/80x80?text=AC",
    },
  },
  {
    id: 2,
    title: "Why Gamified Learning Works",
    preview:
      "Discover the cognitive science behind competition-based retention and playful education.",
    img: "https://placeholder.vn/placeholder/640x360?text=Gamified+Learning",
    date: "March 2, 2025",
    tag: "Education",
    author: {
      name: "Maya Singh",
      avatar: "https://placeholder.vn/placeholder/80x80?text=MS",
    },
  },
  {
    id: 3,
    title: "AI-Powered Quiz Creation",
    preview:
      "Our AI helps teachers and creators craft smarter, richer questions instantly.",
    img: "https://placeholder.vn/placeholder/640x360?text=AI+Creation",
    date: "February 18, 2025",
    tag: "AI",
    author: {
      name: "Leo Nakamura",
      avatar: "https://placeholder.vn/placeholder/80x80?text=LN",
    },
  },
  {
    id: 4,
    title: "Inside the Edunity Community",
    preview:
      "Creators, teachers, and students are helping shape the evolution of interactive learning.",
    img: "https://placeholder.vn/placeholder/640x360?text=Community",
    date: "January 30, 2025",
    tag: "Community",
    author: {
      name: "Jordan Blake",
      avatar: "https://placeholder.vn/placeholder/80x80?text=JB",
    },
  },
  {
    id: 5,
    title: "Designing Better Classroom Games",
    preview:
      "What makes a classroom experience fun, competitive, and unforgettable?",
    img: "https://placeholder.vn/placeholder/640x360?text=Design",
    date: "January 14, 2025",
    tag: "Design",
    author: {
      name: "Priya Desai",
      avatar: "https://placeholder.vn/placeholder/80x80?text=PD",
    },
  },
  {
    id: 6,
    title: "Teacher Toolkit: Quick Start",
    preview:
      "A hands-on guide for teachers to run their first Edunity session with minimal setup.",
    img: "https://placeholder.vn/placeholder/640x360?text=Teacher+Toolkit",
    date: "January 8, 2025",
    tag: "Teacher Resources",
    author: {
      name: "Sam Rivera",
      avatar: "https://placeholder.vn/placeholder/80x80?text=SR",
    },
  },
];

const currentBanner = ref(0);
const visibleCount = ref(4);
const query = ref("");

const nextBanner = () => {
  currentBanner.value = (currentBanner.value + 1) % banners.length;
};

const prevBanner = () => {
  currentBanner.value =
    (currentBanner.value - 1 + banners.length) % banners.length;
};

const loadMore = () => {
  visibleCount.value += 3;
};

const filteredArticles = computed(() => {
  if (!query.value.trim()) return allArticles;
  const q = query.value.toLowerCase();
  return allArticles.filter(
    a =>
      a.title.toLowerCase().includes(q) ||
      a.preview.toLowerCase().includes(q) ||
      a.tag.toLowerCase().includes(q) ||
      a.author.name.toLowerCase().includes(q)
  );
});

const visibleArticles = computed(() =>
  filteredArticles.value.slice(0, visibleCount.value)
);

const goToArticle = id => {
  router.push(`/blogs/article/${id}`);
};

const goToBanner = () => {
  router.push(`/blogs/article/${banners[currentBanner.value].id}`);
};
</script>

<style lang="scss" src="./BlogsHomePage.scss"></style>
