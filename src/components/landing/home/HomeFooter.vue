<script setup lang="ts">
import logo from '@assets/logo.webp'
</script>

<template>
  <v-footer class="home-footer">
    <v-container class="footer-container">
      <v-row class="footer-grid">
        <v-col cols="12" md="auto" class="footer-section">
          <div class="footer-logo d-flex align-center">
            <v-img :src="logo" max-width="32" max-height="32" class="logo-icon" />
            <span class="logo-text ml-2">Edunity</span>
          </div>
          <p class="footer-description text-body-2">
            The all-in-one Classroom Management System solution trusted by schools and institutes in
            Vietnam to deliver engaging, equitable, and measurable education from anywhere in the world.
          </p>
        </v-col>

        <v-col cols="12" md="auto" class="footer-section">
          <h3 class="footer-title">Products</h3>
          <v-list density="compact" class="footer-links">
            <v-list-item to="/landing/about" title="About" />
            <v-list-item to="/landing/pricing" title="Pricing" />
            <v-list-item to="/landing/missions" title="Mission" />
          </v-list>
        </v-col>

        <v-col cols="12" md="auto" class="footer-section">
          <h3 class="footer-title">Resources</h3>
          <v-list density="compact" class="footer-links">
            <v-list-item to="/landing/blogs" title="Blogs" />
            <v-list-item to="/landing/forums" title="Forums" />
            <v-list-item to="/landing/faq" title="FAQ" />
            <v-list-item to="/landing/contact" title="Contact" />
          </v-list>
        </v-col>

        <v-col cols="12" md="auto" class="footer-section">
          <h3 class="footer-title">Company</h3>
          <v-list density="compact" class="footer-links">
            <v-list-item to="/landing/about" title="About Us" />
            <v-list-item to="/landing/team" title="Team" />
            <v-list-item to="/landing/help" title="Help Center" />
            <v-list-item to="/landing/terms" title="Terms of Service" />
            <v-list-item to="/landing/privacy" title="Privacy Policy" />
          </v-list>
        </v-col>

        <v-col cols="12" md="auto" class="footer-section">
          <h3 class="footer-title">Connect</h3>
          <div class="footer-socials d-flex ga-4">
            <v-btn icon href="#" variant="text"><v-icon>mdi-facebook</v-icon></v-btn>
            <v-btn icon href="#" variant="text"><v-icon>mdi-instagram</v-icon></v-btn>
            <v-btn icon href="#" variant="text"><v-icon>mdi-youtube</v-icon></v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-8" />

      <div class="footer-bottom text-center text-caption">
        © 2026 Edunity. All rights reserved.
      </div>
    </v-container>
  </v-footer>
</template>

<style lang="scss">
@use './HomeFooter.scss' as *;
</style>
