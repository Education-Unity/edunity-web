<template>
  <HomeTemplate :isReactive="true">
    <div class="about-page">
      <div class="about-container">
        <div class="about-header">
          <h1 class="about-title">About Edunity</h1>
          <p class="about-subtitle">
            Learn more about us!
          </p>
        </div>

        <div class="about-story">
          <div class="story-text">
            <h2>Our story</h2>
            <p>
              Edunity began in late 2025 with a dream to make learning
              exciting, engaging, and community-powered. Our team is formed with the beliefs that
              education should never feel like a chore; it should spark curiosity and intelliectual connections.
            </p>
            <p>
              From the beginnings to what we have today, our mission
              has remained the same: to transform how people learn, teach, and
              test knowledge through creativity and collaboration.
            </p>
            <p>
              We strive to cultivate an environment where both learning and teaching inspire exploration, and to
              experiences a genuine sense of achievement and growth throughout the educational journey.
            </p>
            <p>Together we learn, and together we progress.</p>
          </div>

          <div class="story-image">
            <div class="story-img-placeholder">
              <v-icon size="80" color="#4A90E2">mdi-school</v-icon>
            </div>
          </div>
        </div>

        <div class="about-mission-vision">
          <v-row>
            <v-col cols="12" md="6">
              <div class="mission-card">
                <v-icon size="48" color="#4A90E2">mdi-target</v-icon>
                <h3>Our mission</h3>
                <p>To democratize education by making engaging, personalized learning accessible to every student,
                  teacher, and institution worldwide.</p>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="vision-card">
                <v-icon size="48" color="#50E3C2">mdi-eye</v-icon>
                <h3>Our Vision</h3>
                <p>A world where technology and human connection unite to create transformative learning experiences
                  that inspire lifelong curiosity.</p>
              </div>
            </v-col>
          </v-row>
        </div>

        <div class="about-values">
          <h2 class="values-title">Our core values</h2>
          <v-row>
            <v-col v-for="(value, index) in coreValues" :key="index" cols="12" sm="6" md="3">
              <div class="value-card">
                <v-icon size="40" :color="value.color">{{ value.icon }}</v-icon>
                <h4>{{ value.title }}</h4>
                <p>{{ value.description }}</p>
              </div>
            </v-col>
          </v-row>
        </div>

        <div class="about-journey">
          <h2 class="journey-title">The milestone we once dreamed of</h2>

          <v-timeline align="alternate" line-color="secondary">
            <v-timeline-item v-for="(milestone, index) in milestones" :key="index" class="timeline-item"
              dot-color="secondary" size="small">
              <template #icon>
                <v-icon :color="milestone.color">{{ milestone.icon }}</v-icon>
              </template>
              <div class="timeline-content">
                <h3>{{ milestone.month }}</h3>
                <hr />

                <h4>{{ milestone.title }}</h4>
                <p>{{ milestone.description }}</p>
              </div>
            </v-timeline-item>
          </v-timeline>
        </div>

        <div class="about-stats">
          <h2 class="stats-title">Thanks to our connection, we have cummulated</h2>

          <v-row class="stats-grid">
            <v-col v-for="(stat, index) in companyStats" :key="index" cols="6" md="3">
              <div class="stat-card">
                <div class="stat-number">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </v-col>
          </v-row>
        </div>

        <div class="about-future">
          <h2 class="future-title">But it's only the start</h2>
          <p>
            It's not over for us. This journey has only just begun. We are committed to redefining further how education
            works
            around the world, alongside the best way to make learning more interesting and engaging for students around
            the
            world, one step at a time!
          </p>
          <p>So what are we waiting for?</p>
          <div class="future-cta">
            <v-btn to="/register" color="#4A90E2" size="large" class="future-btn">
              Join our journey
            </v-btn>
            <v-btn variant="outlined" color="#4A90E2" size="large">
              Contact us
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup>
import HomeTemplate from "../../templates/HomeTemplate";

const coreValues = [
  {
    icon: "mdi-lightbulb-on",
    title: "Innovation",
    description: "Constantly pushing boundaries to create cutting-edge learning solutions",
    color: "#FF6B6B"
  },
  {
    icon: "mdi-account-group",
    title: "Community",
    description: "Building a global network of educators and learners who support each other",
    color: "#4ECDC4"
  },
  {
    icon: "mdi-access-point",
    title: "Accessibility",
    description: "Making quality education available to everyone, everywhere",
    color: "#45B7D1"
  },
  {
    icon: "mdi-chart-line",
    title: "Excellence",
    description: "Delivering the highest quality learning experiences and outcomes",
    color: "#96CEB4"
  }
];

const milestones = [
  {
    month: "September 2025",
    title: "The beginning",
    description: "Edunity was founded with a vision to revolutionize learning through gamification and AI-driven personalization.",
    icon: "mdi-rocket-launch",
    color: "#4A90E2"
  },
  {
    month: "October 2025",
    title: "First beta launch",
    description: "Released our beta version, empowering early adopters to create and play interactive quizzes with real-time feedback.",
    icon: "mdi-trophy",
    color: "#50E3C2"
  },
  {
    month: "December 2025",
    title: "10,000 Users",
    description: "Reached our first major milestone with 10,000 active educators and students joining our platform.",
    icon: "mdi-chart-line",
    color: "#F5A623"
  },
  {
    month: "February 2026",
    title: "Global Recognition",
    description: "Awarded 'Best EdTech Innovation' at the Southeast Asia Education Summit.",
    icon: "mdi-medal",
    color: "#D0021B"
  },
  {
    month: "April 2026",
    title: "AI Learning Engine",
    description: "Launched our proprietary AI engine that personalizes learning paths for every student.",
    icon: "mdi-robot",
    color: "#9013FE"
  }
];

const companyStats = [
  { value: "50K+", label: "Active Users" },
  { value: "120+", label: "Countries" },
  { value: "500+", label: "Institutions" },
];
</script>

<style lang="scss" scoped>
@use "./AboutPage.scss" as *;
</style>
