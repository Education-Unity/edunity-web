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
            <v-list-item to="/community" title="Community" />
            <v-list-item to="/pricing" title="Pricing" />
            <v-list-item to="/mission" title="Mission" />
          </v-list>
        </v-col>

        <v-col cols="12" md="auto" class="footer-section">
          <h3 class="footer-title">Resources</h3>
          <v-list density="compact" class="footer-links">
            <v-list-item to="/blogs" title="Blogs" />
            <v-list-item to="/forums" title="Forums" />
            <v-list-item to="/faq" title="FAQ" />
            <v-list-item to="/contact" title="Contact" />
          </v-list>
        </v-col>

        <v-col cols="12" md="auto" class="footer-section">
          <h3 class="footer-title">Company</h3>
          <v-list density="compact" class="footer-links">
            <v-list-item to="/about" title="About Us" />
            <v-list-item to="/team" title="Team" />
            <v-list-item to="/help" title="Help Center" />
            <v-list-item to="/terms" title="Terms of Service" />
            <v-list-item to="/privacy" title="Privacy Policy" />
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
        © 2025 Edunity. All rights reserved.
      </div>
    </v-container>
  </v-footer>
</template>

<style lang="scss">
.home-footer {
  background-color: #0f172a;
  color: white;

  .footer-container {
    max-width: 1250px;
    padding: 3rem 1.5rem;
  }

  .footer-grid {
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 2rem;
    }
  }

  .footer-section {
    .logo-text {
      font-size: 1.25rem;
      font-weight: 600;
    }

    .footer-description {
      color: #94a3b8;
    }

    .footer-title {
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .footer-links {
      background: transparent !important;

      :deep(.v-list-item) {
        min-height: auto;
        padding: 0;

        a {
          color: #94a3b8;
          text-decoration: none;
          &:hover {
            color: white;
          }
        }
      }
    }

    .footer-socials {
      a {
        color: #94a3b8;
        &:hover {
          color: white;
        }
      }
    }
  }

  .v-list-item-title {
    color: #FFF !important;
  }

  .footer-bottom {
    color: #94a3b8;
  }
}
</style>