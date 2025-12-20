<template>
  <HomeTemplate :isReactive="true">
    <div class="about-page">
      <div class="about-container">
        <div class="about-header">
          <h1 class="about-title">About Edunity</h1>
          <p class="about-subtitle">
            We're crafting the next generation of interactive, AI-driven
            learning experiences.
          </p>
        </div>

        <div class="about-story">
          <div class="story-text">
            <h2>Our Story</h2>
            <p>
              Edunity began in late 2025 with a dream to make learning
              exciting, engaging, and community-powered. We believe that
              education shouldn't feel like a chore—it should spark curiosity
              and connection.
            </p>
            <p>
              From our humble beginnings to our first beta launch, our mission
              has remained the same: transform how people learn, teach, and
              test knowledge through creativity and collaboration.
            </p>
            <p>
              With an AI-driven core and a passionate community, we're
              building a world where quizzes inspire discovery and every
              learner finds joy in progress.
            </p>
          </div>

          <div class="story-image">
            <!-- <v-img
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c"
              class="story-img"
            /> -->
          </div>
        </div>

        <div class="about-journey">
          <h2 class="journey-title">Our Journey</h2>

          <v-timeline align="alternate" line-color="secondary">
            <v-timeline-item
              v-for="(milestone, index) in milestones"
              :key="index"
              dot-color="secondary"
            >
              <template #icon>
                <v-icon>{{ milestone.icon }}</v-icon>
              </template>

              <h3>{{ milestone.month }}</h3>
              <h4>{{ milestone.title }}</h4>
              <p>{{ milestone.description }}</p>
            </v-timeline-item>
          </v-timeline>
        </div>

        <div class="about-team">
          <h2 class="team-title">Meet Our Leadership</h2>

          <div class="team-grid">
            <v-card
              v-for="(member, index) in team"
              :key="index"
              class="team-card"
              elevation="2"
            >
              <v-card-text>
                <div class="team-image-container">
                  <!-- <v-img
                    :src="member.img"
                    class="team-image"
                  /> -->
                </div>
                <h3>{{ member.name }}</h3>
                <p>{{ member.role }}</p>
              </v-card-text>
            </v-card>
          </div>
        </div>

        <div class="about-future">
          <h2 class="title">Our Future</h2>
          <p>
            The journey has just begun. With innovation, AI, and community at
            our heart, we're redefining how the world learns — one quiz at a
            time.
          </p>
        </div>
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup>
import HomeTemplate from "../../templates/HomeTemplate";

const milestones = [
  {
    month: "September 2025",
    title: "The Beginning",
    description:
      "Edunity was founded with a vision to revolutionize learning through gamification.",
    icon: "mdi-rocket-launch",
  },
  {
    month: "October 2025",
    title: "First Beta Launch",
    description:
      "Released our beta version, empowering early adopters to create and play interactive quizzes.",
    icon: "mdi-trophy",
  },
];

const team = [
  {
    name: "Tu Thien Bao",
    role: "Founder & CEO, CTO",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  },
  {
    name: "Nguyen Nhat Anh",
    role: "Lead Backend, CTO",
    img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
  },
];
</script>

<style lang="scss" src="./AboutPage.scss"></style>
