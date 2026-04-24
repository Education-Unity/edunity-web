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
            <v-card v-for="(logo, index) in logos" :key="index" class="logo-card" elevation="2">
              <v-card-text>
                <div class="logo-wrapper">
                  <v-img :src="logo.img" :alt="logo.name" class="logo-image" contain />
                </div>
                <h3>{{ logo.name }}</h3>
                <p>{{ logo.description }}</p>
                <v-chip size="small" class="format-chip">{{ logo.format }}</v-chip>
              </v-card-text>
            </v-card>
          </div>
        </div>

        <div class="logo-usage-rules">
          <h2 class="section-title">Logo Usage Rules</h2>
          <div class="rules-container">
            <div class="rule-card">
              <v-icon size="32" color="#7C3AED">mdi-arrow-expand-horizontal</v-icon>
              <h3>Clear Space</h3>
              <p>Minimum clear space equal to the height of the letter "E" around the logo. No text, graphics, or other
                elements may intrude this space.</p>
            </div>
            <div class="rule-card">
              <v-icon size="32" color="#7C3AED">mdi-vector-square</v-icon>
              <h3>Proportions</h3>
              <p>Do not stretch, rotate, distort, or recolor the logo outside the approved color palette.</p>
            </div>
            <div class="rule-card">
              <v-icon size="32" color="#7C3AED">mdi-format-align-left</v-icon>
              <h3>Placement</h3>
              <p>Preferred placement: top-left corner of interfaces, centered on marketing materials and presentations.
              </p>
            </div>
            <div class="rule-card">
              <v-icon size="32" color="#7C3AED">mdi-file-download</v-icon>
              <h3>Download Assets</h3>
              <p>Available formats: SVG, PNG, EPS. Contact design@edunity.com for access to the complete asset library.
              </p>
            </div>
          </div>
        </div>

        <div class="brand-colors">
          <h2 class="section-title">Color Palette</h2>
          <div class="color-grid">
            <div v-for="(item, index) in palette" :key="index" class="color-card">
              <div class="color-sample" :style="{ backgroundColor: item.color }" />
              <h4>{{ item.name }}</h4>
              <p>{{ item.color }}</p>
              <p class="color-usage">{{ item.usage }}</p>
            </div>
          </div>
        </div>

        <div class="brand-icons">
          <h2 class="section-title">Icon Set</h2>
          <div class="icon-section">
            <div class="icon-recommendation">
              <h3>Icon Library</h3>
              <p>Material Symbols (outlined, rounded variant)</p>
              <div class="icon-preview">
                <div class="icon-item">
                  <v-icon size="20">mdi-home</v-icon>
                  <span>20px</span>
                </div>
                <div class="icon-item">
                  <v-icon size="24">mdi-home</v-icon>
                  <span>24px</span>
                </div>
                <div class="icon-item">
                  <v-icon size="32">mdi-home</v-icon>
                  <span>32px</span>
                </div>
                <div class="icon-item">
                  <v-icon size="48">mdi-home</v-icon>
                  <span>48px</span>
                </div>
                <div class="icon-item">
                  <v-icon size="64">mdi-home</v-icon>
                  <span>64px</span>
                </div>
              </div>
            </div>
            <div class="icon-guidelines">
              <h3>Icon Guidelines</h3>
              <ul>
                <li>Consistent stroke width: 1.5-2px</li>
                <li>Size scale: 20px (small), 24px (default), 32px (large), 48px (hero)</li>
                <li>Use outlined rounded variant for consistency</li>
                <li>Icons should be paired with text labels when conveying critical information</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="brand-accessibility">
          <h2 class="section-title">Accessibility Requirements</h2>
          <div class="accessibility-grid">
            <div class="accessibility-card">
              <v-icon size="40" color="#10B981">mdi-contrast</v-icon>
              <h3>Contrast Ratio</h3>
              <p>Minimum 4.5:1 for normal text (WCAG AA)</p>
              <p class="note">All interactive elements must pass 3:1 contrast against their background</p>
            </div>
            <div class="accessibility-card">
              <v-icon size="40" color="#10B981">mdi-information-outline</v-icon>
              <h3>Color Independence</h3>
              <p>Color is never the only means of conveying information. Always pair with icons, patterns, or text
                labels.</p>
            </div>
          </div>
        </div>

        <div class="brand-identity">
          <h2 class="section-title">Brand Identity</h2>
          <div class="identity-container">
            <div class="identity-card">
              <h3>Official Name</h3>
              <p class="official-name">Edunity</p>
              <p class="tagline">A Dynamic Classroom Service for Institutes</p>
              <div class="name-variations">
                <h3>Approved name variations</h3>
                <ol>
                  <li>Edunity (Primary)</li>
                  <li>Edunity Platform</li>
                  <li>Edunity Classroom</li>
                  <li>Edunity Learning Ecosystem</li>
                  <li>Edunity Classroom Management</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div class="brand-prohibited">
          <h2 class="section-title">Prohibited Usage</h2>
          <div class="prohibited-grid">
            <div class="prohibited-card">
              <v-icon size="28" color="#DC2626">mdi-alert-octagon</v-icon>
              <h3>Incorrect Capitalization</h3>
              <p>Avoid random capitalization that can create confusion and affect SEO.</p>
              <div class="bad-examples">
                <span class="bad"><v-icon icon="mdi-close" /> EdUnity</span>
                <span class="bad"><v-icon icon="mdi-close" /> EDUNITY</span>
                <span class="bad"><v-icon icon="mdi-close" /> edunity</span>
                <span class="good">✓ Edunity</span>
              </div>
            </div>
            <div class="prohibited-card">
              <v-icon size="28" color="#DC2626">mdi-alert-octagon</v-icon>
              <h3>Misspellings</h3>
              <p>Avoid typos or variations that redirect to other unrelated service brands.</p>
              <div class="bad-examples">
                <span class="bad"><v-icon icon="mdi-close" /> EduNity</span>
                <span class="bad"><v-icon icon="mdi-close" /> Eduniti</span>
                <span class="bad"><v-icon icon="mdi-close" /> Eduunity</span>
              </div>
            </div>
            <div class="prohibited-card">
              <v-icon size="28" color="#DC2626">mdi-alert-octagon</v-icon>
              <h3>Abbreviations</h3>
              <p>Avoid abbreviating the brand name in public-facing materials.</p>
              <div class="bad-examples">
                <span class="bad"><v-icon icon="mdi-close" /> ENU</span>
                <span class="bad"><v-icon icon="mdi-close" /> Ednity</span>
                <span class="bad"><v-icon icon="mdi-close" /> EDNY</span>
              </div>
            </div>
          </div>
        </div>

        <div class="brand-guidelines">
          <h2 class="section-title">Legal & Usage</h2>
          <div class="legal-content">
            <div class="allowed-section">
              <h3><v-icon icon="mdi-check" /> Allowed</h3>
              <ul>
                <li>Use of official Edunity logos in press kits, news articles, and product reviews.</li>
                <li>Use of brand marks for community events or educational showcases referencing Edunity.</li>
                <li>Embedding logos in videos or digital presentations that discuss or feature Edunity.</li>
                <li>Referencing Edunity as an example in educational or industry publications.</li>
              </ul>
            </div>

            <div class="not-allowed-section">
              <h3><v-icon icon="mdi-close" /> Not Allowed</h3>
              <ul>
                <li>Modifying, distorting, recoloring, or altering official Edunity logos.</li>
                <li>Using Edunity branding to imply partnership, endorsement, or affiliation without approval.</li>
                <li>Selling merchandise or products featuring the Edunity logo without explicit written consent.</li>
                <li>Using the brand for political, harmful, or defamatory content.</li>
                <li>Creating derivative logos or marks that imitate Edunity's brand identity.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="brand-contact">
        <h2 class="section-title">Any questions?</h2>
        <p>For brand usage inquiries, asset requests, or partnership approvals, please contact our brand team by these
          options:</p>
        <div class="contact-links">
          <v-btn class="btn-contact" variant="filled" href="mailto:brand@edunity.com">
            <v-icon left>mdi-email</v-icon>
            <p>brand@edunity.com</p>
          </v-btn>
          <v-btn class="btn-contact" variant="filled" to="/contact">
            <v-icon left>mdi-chat</v-icon>
            <p>Contact Form</p>
          </v-btn>
        </div>
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup>
import HomeTemplate from '@/templates/HomeTemplate.vue';

const logos = [
  {
    name: "Primary Logo",
    img: "https://placehold.co/400x160/7C3AED/white?text=Edunity",
    description: "Full logo: 'Edunity' wordmark with graduation cap / unity symbol icon. This is the main brand mark used across product surfaces, marketing, and digital experiences.",
    format: "SVG, PNG, EPS"
  },
  {
    name: "Monochrome Logo",
    img: "https://placehold.co/400x160/1E293B/white?text=Edunity",
    description: "White on navy / navy on white version. Used for single-color applications, embossing, and low-contrast printing.",
    format: "SVG, PNG"
  },
  {
    name: "Icon Mark",
    img: "https://placehold.co/200x200/7C3AED/white?text=E",
    description: "Icon-only version (square favicon, app icon). A compact symbol representing Edunity, used for avatars, favicons, and constrained spaces.",
    format: "SVG, PNG, ICO"
  }
];

const palette = [
  { name: "Primary", color: "#7C3AED", usage: "Primary brand color, used for CTAs, links, and key UI elements" },
  { name: "Secondary", color: "#0EA5E9", usage: "Accent color, used for secondary buttons and highlights" },
  { name: "Tertiary", color: "#F472B6", usage: "Complementary accent for special features and branding" },
  { name: "Neutral", color: "#475569", usage: "Typography, borders, and supporting UI elements" }
];
</script>

<style lang="scss" scoped>
@use "./BrandingPage.scss" as *;
</style>
