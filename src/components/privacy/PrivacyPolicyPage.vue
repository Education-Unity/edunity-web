<template>
  <home-template>
    <div class="privacy-page">
      <div class="privacy-container">
        <!-- Header -->
        <div class="privacy-header text-center my-8">
          <h1 class="privacy-title display-1 font-weight-bold mb-4">Privacy Policy</h1>
          <p class="privacy-subtitle headline">Effective Date: November 10, 2025</p>
        </div>

        <!-- Table of Contents -->
        <div class="privacy-toc my-10">
          <h2 class="toc-title title mb-4">Table of Contents</h2>
          <v-list dense>
            <v-list-item
              v-for="section in sections"
              :key="section.id"
              :href="`#${section.id}`"
              link
              class="pl-0"
            >
              <v-list-item-content>
                <v-list-item-title>{{ section.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>

        <!-- Main Content -->
        <v-container class="privacy-box">
          <!-- Introduction -->
          <div class="privacy-intro mb-10">
            <p class="body-1">
              At Edunity, your privacy is our priority. We believe that learning should be both empowering and secure. This Privacy Policy describes how we handle your data responsibly to maintain trust, transparency, and safety throughout your experience.
            </p>
            <p class="body-1">
              By using our services, you consent to the collection and use of information as described in this Policy. Please review it carefully to understand how your data is managed and protected.
            </p>
          </div>

          <!-- Sections -->
          <div
            v-for="section in sections"
            :key="section.id"
            :id="section.id"
            class="privacy-section mb-12"
          >
            <h2 class="privacy-section-title title mb-4">{{ section.title }}</h2>
            <div class="privacy-section-text body-1 white-space-pre-line">
              {{ contentMap[section.id] }}
            </div>
          </div>

          <!-- Footer -->
          <div class="privacy-footer mt-12 pt-8 border-t">
            <p class="body-1">
              By continuing to use Edunity, you confirm that you have read and understood this Privacy Policy and agree to the collection and use of information in accordance with it.
            </p>
          </div>
        </v-container>
      </div>
    </div>
  </home-template>
</template>

<script setup>
import { onMounted } from 'vue'
import HomeTemplate from '@/templates/HomeTemplate.vue' // Adjust path as needed
import { setBrowserTitle } from '@/utils/web_util'

const sections = [
  { id: 'overview', title: '1. Overview' },
  { id: 'data-collection', title: '2. Information We Collect' },
  { id: 'data-usage', title: '3. How We Use Your Information' },
  { id: 'cookies', title: '4. Cookies and Tracking Technologies' },
  { id: 'third-parties', title: '5. Third-Party Services' },
  { id: 'data-protection', title: '6. Data Security and Protection' },
  { id: 'children', title: '7. Children’s Privacy' },
  { id: 'rights', title: '8. Your Rights and Choices' },
  { id: 'data-retention', title: '9. Data Retention' },
  { id: 'updates', title: '10. Updates to This Policy' },
  { id: 'contact', title: '11. Contact Information' },
]

const contentMap = {
  overview: `
    Edunity ("we", "our", or "us") values your privacy and is committed to protecting your personal information.
    This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website,
    applications, and related services (collectively, the "Platform"). By accessing or using Edunity, you agree
    to the practices described in this Policy.
  `,
  'data-collection': `
    We may collect the following types of information when you use our Platform:
    • Personal Information — such as your name, email address, profile picture, and account credentials.
    • Usage Data — such as quiz results, progress, scores, and interaction logs.
    • Technical Data — including IP address, browser type, device identifiers, and operating system information.
    • Communication Data — such as messages sent through our platform or support channels.
  `,
  'data-usage': `
    We use collected information to:
    • Provide and maintain the functionality of the Platform.
    • Personalize learning experiences and improve content recommendations.
    • Communicate updates, announcements, or important notifications.
    • Monitor usage patterns to enhance performance and reliability.
    • Comply with legal obligations and enforce our Terms of Service.
  `,
  cookies: `
    Edunity uses cookies and similar technologies to improve user experience, analyze traffic, and store preferences.
    You may adjust your browser settings to reject cookies, but doing so may limit functionality. Cookies help us:
    • Remember login sessions and preferences.
    • Analyze user behavior and improve usability.
    • Ensure platform security and prevent fraud.
  `,
  'third-parties': `
    We may use third-party tools and integrations, such as analytics providers or cloud storage services, to enhance
    the performance of Edunity. These services may process your data under their own privacy policies. Edunity
    ensures all partners adhere to strict data protection standards.
  `,
  'data-protection': `
    We implement industry-standard measures to protect your information from unauthorized access, alteration, or
    disclosure. These include encryption, access control, and secure data storage. However, no system can be
    completely secure, and you acknowledge that you share information at your own risk.
  `,
  children: `
    Edunity is designed for learners aged 13 and older. We do not knowingly collect personal information from
    children under 13. If we become aware that a child under 13 has provided personal data, we will delete it
    immediately. Parents or guardians who believe their child has provided data may contact us for removal.
  `,
  rights: `
    Depending on your location, you may have the following rights:
    • Access — Request a copy of the personal data we hold about you.
    • Correction — Update or correct inaccurate information.
    • Deletion — Request the deletion of your data, subject to legal retention requirements.
    • Restriction — Limit how we process certain information.
    • Objection — Withdraw consent for certain uses of your data.
    To exercise these rights, please contact us at support@Edunity.com.
  `,
  'data-retention': `
    We retain your personal information only as long as necessary to fulfill the purposes outlined in this Policy,
    or as required by applicable law. When data is no longer needed, it is securely deleted or anonymized.
  `,
  updates: `
    We may revise this Privacy Policy periodically to reflect operational, legal, or regulatory changes. Updates
    will be posted on this page, and the "Effective Date" will be revised accordingly. Continued use of the
    Platform after any update constitutes acceptance of the new Policy.
  `,
  contact: `
    If you have any questions, concerns, or complaints regarding this Privacy Policy, please contact us at:
    support@Edunity.com
  `,
}

// Set browser title (equivalent to setBrowserTitle utility)
onMounted(() => {
  setBrowserTitle('Privacy Policy')
})
</script>

<style scoped>
.privacy-page {
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #f9f9f9;
}

.privacy-container {
  max-width: 900px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 40px;
}

.privacy-title {
  color: #1976d2;
}

.privacy-subtitle {
  color: #666;
}

.toc-title {
  color: #333;
}

.privacy-section-title {
  color: #1976d2;
  border-bottom: 2px solid #1976d2;
  padding-bottom: 8px;
}

.privacy-section-text {
  line-height: 1.8;
  color: #444;
}

.border-t {
  border-top: 1px solid #e0e0e0;
}

.white-space-pre-line {
  white-space: pre-line;
}
</style>