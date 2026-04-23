<template>
  <HomeTemplate>
    <div class="tos-page">
      <div class="tos-container">
        <div class="tos-header">
          <h1 class="tos-title">Terms of Service</h1>
          <p class="tos-subtitle">Effective Date: November 10, 2025</p>
        </div>

        <div class="tos-toc">
          <h2 class="toc-title">Table of Contents</h2>
          <ul>
            <li v-for="section in sections" :key="section.id">
              <a :href="`#${section.id}`">{{ section.title }}</a>
            </li>
          </ul>
        </div>

        <div class="tos-box">
          <div class="tos-intro">
            <p>
              Welcome to Edunity! These Terms of Service outline the rules
              and guidelines that govern your use of our platform. Please read
              them carefully before accessing or engaging with any part of
              Edunity. By using our services, you agree to comply with all
              the terms, policies, and conditions described herein.
            </p>
            <p>
              Edunity is dedicated to creating interactive, engaging, and
              AI-powered educational experiences. We strive to maintain a
              respectful and secure environment for all users while
              encouraging creativity and collaboration in learning.
            </p>
          </div>

          <div
            v-for="section in sections"
            :key="section.id"
            :id="section.id"
            class="tos-section"
          >
            <h2 class="tos-section-title">{{ section.title }}</h2>
            <p class="tos-section-text">
              {{ contentMap[section.id] }}
            </p>
          </div>

          <div class="tos-footer">
            <p>
              By continuing to use Edunity, you acknowledge that you have
              read, understood, and agreed to be bound by these Terms of
              Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup>
import { onMounted } from "vue";
import HomeTemplate from "@/templates/HomeTemplate";
import { setBrowserTitle } from "@/utils/web_util";

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "use", title: "2. Platform Use and Responsibilities" },
  { id: "age", title: "3. Age Requirement" },
  { id: "account", title: "4. Account Registration" },
  { id: "content", title: "5. User Content" },
  { id: "ip", title: "6. Intellectual Property" },
  { id: "payment", title: "7. Payment and Subscription" },
  { id: "termination", title: "8. Termination of Service" },
  { id: "liability", title: "9. Limitation of Liability" },
  { id: "indemnification", title: "10. Indemnification" },
  { id: "modifications", title: "11. Modifications to Terms" },
  { id: "law", title: "12. Governing Law" },
  { id: "contact", title: "13. Contact Information" },
];

const contentMap = {
  acceptance: `
By accessing or using Edunity ("the Platform"), you agree to be bound by these Terms of Service ("Terms").
If you do not agree, you may not use the Platform. These Terms apply to all users including educators, learners,
and creators.
`,
  use: `
You agree to use Edunity only for lawful and educational purposes. You are responsible for any content
you create or share on the Platform, and you agree not to engage in activities that could harm, disrupt,
or misuse the service in any manner.
`,
  age: `
Because Edunity focuses on education and interactive learning, it requires that all users be at least
13 years of age to register or use any of its services. Users under 18 must have permission from a parent
or guardian. Edunity does not knowingly collect or process data from individuals under 13 years old.
If such data is discovered, it will be deleted promptly.
`,
  account: `
Certain features of Edunity may require registration. You agree to provide accurate and complete
information when creating an account and to keep your login credentials secure. Edunity cannot be held
responsible for losses resulting from unauthorized access to your account.
`,
  content: `
You retain ownership of the content you create, but you grant Edunity a non-exclusive, worldwide,
royalty-free license to use, display, and distribute your content solely for platform operation and
improvement. You must not post material that infringes intellectual property, promotes discrimination,
or violates any applicable laws.
`,
  ip: `
All materials, designs, and technologies provided by Edunity are protected by intellectual property laws.
You may not copy, reproduce, or distribute any portion of the Platform without express written consent.
`,
  payment: `
Certain features may require a subscription or payment. Prices and terms are subject to change with prior
notice. All payments are final except where required by law. Subscriptions will automatically renew unless
canceled before the renewal date.
`,
  termination: `
Edunity may suspend or terminate your access to the Platform at any time for violation of these Terms or
misuse of its features. Upon termination, your access and data may be removed according to applicable laws.
`,
  liability: `
Edunity provides the Platform “as is” and makes no warranties regarding its availability, accuracy, or
reliability. To the fullest extent permitted by law, Edunity shall not be liable for any indirect or
consequential damages arising from use or inability to use the Platform.
`,
  indemnification: `
You agree to indemnify and hold harmless Edunity, its affiliates, and employees from claims or damages
arising out of your misuse of the Platform or violation of these Terms.
`,
  modifications: `
Edunity may revise these Terms periodically. Continued use after any update constitutes acceptance of
the revised Terms. You are encouraged to review this page regularly.
`,
  law: `
These Terms are governed by the laws of your country of residence. Any dispute arising from or related
to these Terms shall be subject to the exclusive jurisdiction of the courts in that region.
`,
  contact: `
For any inquiries regarding these Terms of Service, please contact us at:
support@Edunity.com
`,
};

onMounted(() => {
  setBrowserTitle("Terms of Service");
});
</script>

<style lang="scss" src="./TermsOfServicePage.scss"></style>
