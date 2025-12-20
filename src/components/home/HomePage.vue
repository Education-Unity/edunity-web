<template>
  <HomeTemplate :isReactive="true">
    <div class="home-page">
      <div class="hero-container">
        <div>
          <h1 class="title">Edunity</h1>
          <p class="hero-desc">
            The all-in-one Classroom Management System solution trusted by
            schools and institutes in
            <strong> Vietnam</strong> to deliver engaging, equitable, and
            measurable education from anywhere in the world.
          </p>
          <div class="hero-buttons">
            <v-btn to="/play" color="primary" size="large" class="home-page__btn--primary">
              Start a new class
            </v-btn>
            <v-btn to="/register" variant="outlined" size="large" class="home-page__btn--outline">
              Explore our features
            </v-btn>
          </div>
        </div>
        <div class="hero-image"></div>
      </div>

      <div class="stats-container">
        <p class="stats-title">As of 2025, our service has provided for:</p>
        <v-row class="stats-grid">
          <v-col v-for="(stat, index) in stats" :key="index" cols="6" md="3" class="stat-item">
            <p class="stat-value">{{ stat.value }}</p>
            <p class="stat-label">{{ stat.label }}</p>
          </v-col>
        </v-row>

        <div class="trusted-section">
          <p class="stats-title">Alongside project partners:</p>
          <div class="trusted-logos">
            <div v-for="(company, index) in partners" :key="index" class="trusted-logo">
              <img :src="company.logo" :alt="company.name" />
            </div>
          </div>
        </div>

        <div class="trusted-section">
          <p class="stats-title">
            Trusted by leading companies worldwide:
          </p>
          <div class="trusted-logos">
            <div v-for="(company, index) in trustedBy" :key="index" class="trusted-logo">
              <img :src="company.logo" :alt="company.name" />
            </div>
          </div>
        </div>
      </div>

      <div class="features-container">
        <div>
          <p class="title-sub">Our solution to everyday classrooms</p>
          <p class="feature-intro">
            Everything teachers need to create, deliver, and measure impactful
            learning experiences, all in one intuitive platform.
          </p>
        </div>
        <v-row class="features-list">
          <v-col v-for="(feature, index) in features" :key="index">
            <div class="feature-card">
              <v-icon class="feature-icon" size="48">{{ feature.icon }}</v-icon>
              <div class="home-page__feature-text">
                <p class="feature-title">{{ feature.title }}</p>
                <p class="feature-desc">{{ feature.description }}</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="benefit-section">
        <p class="title-sub" style="margin-bottom: 10px">
          Our target audiences
        </p>
        <p class="benefit-intro">
          Our service is targetted at the following audiences (but not limited
          to):
        </p>
        <v-row class="benefit-grid">
          <v-col v-for="(b, index) in beneficiaries" :key="index">
            <div class="benefit-card">
              <v-icon size="48">{{ b.icon }}</v-icon>
              <p class="benefit-title">{{ b.title }}</p>
              <p class="benefit-desc">{{ b.desc }}</p>
            </div>
          </v-col>
        </v-row>
      </div>

      <div class="cta-card">
        <div class="cta-content">
          <p class="started-title">Ready to enroll?</p>
          <p class="cta-desc">Bring your classroom into the future today!</p>
          <v-btn to="/register" size="large" class="btn-register">
            Get started for free
          </v-btn>
        </div>
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import HomeTemplate from "@/templates/HomeTemplate.vue";
import { setBrowserTitle } from "@/utils/web_util";

const features = [
  {
    icon: "mdi-play-circle",
    title: "Live & Asynchronous Lessons",
    description:
      "Deliver real-time interactive classes or let students learn at their own pace.",
  },
  {
    icon: "mdi-account-group",
    title: "Classroom Collaboration",
    description:
      "Group projects, discussions, live polls, and team-based activities built-in.",
  },
  {
    icon: "mdi-view-dashboard-edit",
    title: "Custom Course Builder",
    description:
      "Drag-and-drop creator for lessons, quizzes, assignments, and multimedia content.",
  },
  {
    icon: "mdi-chart-line",
    title: "Real-Time Analytics",
    description:
      "Track engagement, mastery, and progress with detailed class and student reports.",
  },
  {
    icon: "mdi-translate",
    title: "Multilingual & Inclusive",
    description:
      "Supports 100+ languages with right-to-left layout and accessibility standards.",
  },
  {
    icon: "mdi-devices",
    title: "Works Everywhere",
    description:
      "Fully responsive — phones, tablets, laptops, and interactive whiteboards.",
  },
];

const stats = [
  { value: "250K+", label: "Members" },
  { value: "8M+", label: "Active Students" },
  { value: "56", label: "Institutes" },
  { value: "150+", label: "Countries" },
];

const beneficiaries = [
  {
    icon: "mdi-school",
    title: "Primary & Secondary Schools",
    desc: "Engage young learners with gamified lessons, formative assessments, and parent progress sharing.",
  },
  {
    icon: "mdi-domain",
    title: "Universities & Colleges",
    desc: "Scale large lecture halls with live polling, automated grading, and integrated LMS tools.",
  },
  {
    icon: "mdi-home",
    title: "Homeschooling Families",
    desc: "Full curriculum support, progress tracking, and community-shared resources.",
  },
  {
    icon: "mdi-briefcase",
    title: "Professional Development",
    desc: "Teacher training academies and corporate learning programs love our intuitive platform.",
  },
];

const partners = [
  { name: "Truong Dai hoc Quoc gia TPHCM", logo: "/assets/logos/unesco.png" },
];

const trustedBy = [
  { name: "UNESCO", logo: "/assets/logos/unesco.png" },
  { name: "Cambridge", logo: "/assets/logos/cambridge.png" },
  { name: "British Council", logo: "/assets/logos/british-council.png" },
  {
    name: "Ministry of Education Singapore",
    logo: "/assets/logos/sg-moe.png",
  },
  { name: "Khan Academy", logo: "/assets/logos/khan-academy.png" },
];

onMounted(() => {
  setBrowserTitle(null);
});
</script>

<style scoped lang="scss">
@use "./HomePage.scss" as *;
</style>
