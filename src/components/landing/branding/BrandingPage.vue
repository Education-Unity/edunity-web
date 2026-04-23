<template>
  <HomeTemplate>
    <div class="branding-page">
      <div class="brand-container">
        <div class="brand-header">
          <h1 class="brand-title">Brand & Media Kit</h1>
          <p class="brand-subtitle">
            Official assets, visual identity guidelines, and permitted usage for Edunity branding.
          </p>
        </div>

        <div class="brand-logos">
          <h2 class="section-title">Logos</h2>
          <div class="logo-grid">
            <v-card
              v-for="(logo, index) in logos"
              :key="index"
              class="logo-card"
              elevation="2"
            >
              <v-card-text>
                <v-img
                  :src="logo.img"
                  :alt="logo.name"
                  class="logo-image"
                  cover
                />
                <h3>{{ logo.name }}</h3>
                <p>{{ logo.description }}</p>
              </v-card-text>
            </v-card>
          </div>
        </div>

        <div class="brand-colors">
          <h2 class="section-title">Color Palette</h2>
          <div class="color-grid">
            <div
              v-for="(item, index) in palette"
              :key="index"
              class="color-card"
            >
              <div
                class="color-sample"
                :style="{ backgroundColor: item.color }"
              />
              <h4>{{ item.name }}</h4>
              <p>{{ item.color }}</p>
            </div>
          </div>
        </div>

        <div class="brand-guidelines">
          <h2 class="section-title">Legal & Usage</h2>
          <div class="legal-content">
            <h3>Allowed</h3>
            <ul>
              <li>Use of official Edunity logos in press kits, news articles, and product reviews.</li>
              <li>Use of brand marks for community events or educational showcases referencing Edunity.</li>
              <li>Embedding logos in videos or digital presentations that discuss or feature Edunity.</li>
            </ul>

            <h3>Not Allowed</h3>
            <ul>
              <li>Modifying, distorting, recoloring, or altering official Edunity logos.</li>
              <li>Using Edunity branding to imply partnership, endorsement, or affiliation without approval.</li>
              <li>Selling merchandise or products featuring the Edunity logo without explicit written consent.</li>
              <li>Using the brand for political, harmful, or defamatory content.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup>
import HomeTemplate from "../../templates/HomeTemplate";

const logos = [
  {
    name: "Primary Logo",
    img: "https://via.placeholder.com/500x200?text=Primary+Logo",
    description:
      "This is the main brand mark used across product surfaces, marketing, and digital experiences.",
  },
  {
    name: "Monochrome Logo",
    img: "https://via.placeholder.com/500x200?text=Monochrome+Logo",
    description:
      "Used for single-color applications, embossing, and low-contrast printing.",
  },
  {
    name: "Icon Mark",
    img: "https://via.placeholder.com/200?text=Icon",
    description:
      "A compact symbol representing Edunity, used for avatars, favicons, and constrained spaces.",
  },
];

const palette = [
  { name: "Primary", color: "#7C3AED" },
  { name: "Secondary", color: "#0EA5E9" },
  { name: "Tertiary", color: "#F472B6" },
  { name: "Neutral", color: "#475569" },
];
</script>

<style lang="scss" src="./BrandingPage.scss"></style>
