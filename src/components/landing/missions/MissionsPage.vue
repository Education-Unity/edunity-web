<template>
  <HomeTemplate>
    <div className="mission-page">
      <div className="mission-container">
        <div className="mission-hero">
          <h1 className="mission-title">Our Mission</h1>
          <p className="mission-subtitle">
            Edunity exists to spark curiosity, empower creativity, and turn
            learning into an unforgettable adventure.
          </p>
        </div>

        <div className="mission-vision">
          <div className="vision-content">
            <h2>Why Edunity Exists</h2>
            <p>
              Education thrives when learners feel motivated, confident, and
              inspired. Edunity embraces this idea by blending game
              mechanics, interactive challenges, and smart technology to
              create a world where knowledge doesn't just stick—it's
              celebrated.
            </p>
            <p>
              We believe that powerful learning emerges from playful
              exploration. Whether you're in a classroom, studying at home, or
              competing with friends, Edunity transforms everyday subjects
              into energetic experiences that make learning irresistible.
            </p>
            <p>
              Built with modern students in mind, our platform evolves
              alongside the needs of classrooms, creators, and communities
              worldwide.
            </p>
          </div>
          <div className="vision-graphic"></div>
        </div>

        <div className="mission-pillars">
          <h2 className="section-title">Core Pillars</h2>
          <div className="pillars-grid">
            <v-card
              v-for="(item, index) in pillars"
              :key="index"
              className="pillar-card"
              elevation="2"
            >
              <v-card-text>
                <div className="pillar-icon">{{ item.icon }}</div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </v-card-text>
            </v-card>
          </div>
        </div>

        <div className="mission-experiences">
          <h2 className="section-title">Educational Minigame Experiences</h2>
          <p className="experience-intro">
            Edunity draws inspiration from familiar quiz platforms but
            evolves them into a richer, more playful, customizable ecosystem
            of learning adventures.
          </p>

          <div className="experience-grid">
            <div
              v-for="(exp, index) in experiences"
              :key="index"
              className="experience-card"
            >
              <h3>{{ exp.name }}</h3>
              <p>{{ exp.description }}</p>
            </div>
          </div>
        </div>

        <div className="mission-callout">
          <h2 className="callout-title">Where We’re Headed</h2>
          <p>
            Our journey pushes us toward a future where education feels more
            like discovery, storytelling, and play. Edunity is committed to
            building tools that help every learner—from beginners to lifelong
            scholars—unlock their potential through joy, challenge, and
            exploration.
          </p>
          <p>
            Together with our community, we’re shaping a new era of
            interactive learning—one quiz, one game, one spark of curiosity at
            a time.
          </p>
        </div>
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup>
import { onMounted } from "vue";
import HomeTemplate from "../../templates/HomeTemplate";
import { setBrowserTitle } from "../../utils/web_util";

const pillars = [
  {
    title: "Gamified Learning",
    description:
      "Edunity transforms traditional study time into an energetic, competitive, and memorable minigame experience designed to boost engagement and retention.",
    icon: "🎮",
  },
  {
    title: "AI-Enhanced Creativity",
    description:
      "Our platform empowers learners and educators by using AI to generate quizzes, adaptive challenges, and personalized feedback.",
    icon: "⚡",
  },
  {
    title: "Community-Driven Growth",
    description:
      "We’re building a collaborative environment where teachers, students, and creators shape the next era of interactive education together.",
    icon: "🌱",
  },
];

const experiences = [
  {
    name: "Rapid-Fire",
    description:
      "A fast-paced minigame where players race the clock in a high-intensity challenge that strengthens recall and quick thinking.",
  },
  {
    name: "Battle Rounds",
    description:
      "Competitive head-to-head quizzing that encourages friendly rivalry and transforms classrooms into game arenas.",
  },
  {
    name: "Puzzle Chains",
    description:
      "A strategic mode focused on connecting ideas, perfect for deeper problem-solving and comprehension.",
  },
  {
    name: "Creative Mode",
    description:
      "A space for educators and students to craft unique experiences—alternate rules, variants, and custom quiz paths.",
  },
];

onMounted(() => {
  setBrowserTitle("Mission");
});
</script>

<style lang="scss" src="./MissionsPage.scss"></style>
