<template>
  <HomeTemplate :isReactive="true">
    <div class="team-page">
      <div class="team-container">
        <div class="team-header">
          <h1 class="team-title">Meet Our Leadership</h1>
          <p class="team-subtitle">
            Passionate educators, technologists, and innovators dedicated to transforming education
          </p>
        </div>

        <div class="team-filters">
          <v-btn
            v-for="filter in filters"
            :key="filter"
            :variant="selectedFilter === filter ? 'flat' : 'outlined'"
            :color="selectedFilter === filter ? '#4A90E2' : undefined"
            @click="selectedFilter = filter"
            class="filter-btn"
          >
            {{ filter }}
          </v-btn>
        </div>

        <div class="team-grid">
          <v-card
            v-for="(member, index) in filteredTeam"
            :key="index"
            class="team-card"
            elevation="2"
          >
            <v-card-text>
              <div class="team-image-container">
                <div class="team-image-placeholder">
                  <v-icon size="60" color="#4A90E2">mdi-account-circle</v-icon>
                </div>
              </div>
              <h3>{{ member.name }}</h3>
              <p class="team-role">{{ member.role }}</p>
              <p class="team-department">
                <v-icon size="16" class="dept-icon">mdi-domain</v-icon>
                {{ member.department }}
              </p>
              <p class="team-bio">{{ member.bio }}</p>
              <div class="team-social">
                <v-icon size="20" class="social-icon">mdi-linkedin</v-icon>
                <v-icon size="20" class="social-icon">mdi-twitter</v-icon>
                <v-icon size="20" class="social-icon">mdi-github</v-icon>
                <v-icon size="20" class="social-icon">mdi-email</v-icon>
              </div>
            </v-card-text>
          </v-card>
        </div>

        <!-- <div class="team-join">
          <h2>Join Our Team</h2>
          <p>We're always looking for talented individuals passionate about education technology</p>
          <v-btn to="/careers" color="#4A90E2" size="large" class="join-btn">
            View Open Positions
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </div> -->
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup>
import { ref, computed } from "vue";
import HomeTemplate from "../../templates/HomeTemplate";

const selectedFilter = ref("All");

const filters = ["All", "Executive", "Engineering", "Product", "Education"];

const team = [
  {
    name: "Tu Thien Bao",
    role: "Founder & CEO",
    department: "Executive",
    bio: "A software architect with 9+ years of experience in software engineering. Has been involved with many freelancing projects before founding Edunity.",
    img: ""
  },
  {
    name: "Nguyen Nhat Anh",
    role: "Chief Technology Officer",
    department: "Executive",
    bio: "Distributed systems expert passionate about scalable learning platforms. Previously led engineering teams at major tech companies.",
    img: ""
  },
];

const filteredTeam = computed(() => {
  if (selectedFilter.value === "All") {
    return team;
  }
  return team.filter(member => member.department === selectedFilter.value);
});
</script>

<style lang="scss" scoped>
@use "./TeamPage.scss" as *;
</style>
