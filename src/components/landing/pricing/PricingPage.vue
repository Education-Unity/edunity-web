<template>
  <HomeTemplate>
    <div class="pricing-page">
      <div class="pricing-container">
        <div class="pricing-header">
          <h1 class="pricing-title">Choose Your Plan</h1>
          <p class="pricing-subtitle">
            Flexible pricing for individuals, teams, and huge organizations.
            Upgrade your learning experience today.
          </p>
        </div>

        <div class="category-toggle">
          <div class="toggle-bg">
            <button
              v-for="cat in ['Personal', 'Business']"
              :key="cat"
              :class="{ active: activeCategory === cat }"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="billing-toggle">
          <v-switch
            v-model="isAnnual"
            inset
            color="primary"
            hide-details
            class="d-inline-flex"
          >
            <template #label>
              <span class="billing-label">
                {{ isAnnual ? "Annual Billing" : "Monthly Billing" }}
                <v-chip
                  v-if="isAnnual"
                  color="secondary"
                  size="x-small"
                  class="ml-2 font-weight-bold"
                >
                  SAVE 20%
                </v-chip>
              </span>
            </template>
          </v-switch>
        </div>

        <div class="plans-grid">
          <v-card
            v-for="(plan, index) in currentPlans"
            :key="index"
            class="plan-card"
            :class="{ popular: plan.popular, enterprise: plan.isEnterprise }"
            elevation="2"
          >
            <v-card-text class="d-flex flex-column h-100">
              <div class="plan-header">
                <h2>{{ plan.name }}</h2>
                <v-chip
                  v-if="plan.popular"
                  size="small"
                  color="secondary"
                  class="popular-chip"
                >
                  Most Popular
                </v-chip>
                <p class="plan-description">{{ plan.description }}</p>
              </div>

              <div class="price-box">
                <div v-if="!plan.isEnterprise">
                  <h3 class="price">
                    ${{ isAnnual ? plan.annualPrice : plan.monthlyPrice }}
                    <span class="period">
                      /{{ isAnnual ? "mo" : "mo" }}
                    </span>
                  </h3>
                  <p v-if="isAnnual" class="billed-yearly">
                    Billed ${{ plan.annualPrice * 12 }} yearly
                  </p>
                </div>
                <div v-else>
                  <h3 class="price">Custom</h3>
                </div>
              </div>

              <v-divider class="mb-4"></v-divider>

              <ul class="feature-list">
                <li v-for="(feature, i) in plan.features" :key="i">
                  <v-icon size="18" color="success" class="mr-2">mdi-check-circle</v-icon>
                  <span>{{ feature }}</span>
                </li>
              </ul>

              <div class="mt-auto">
                <v-btn
                  block
                  size="large"
                  class="cta-btn"
                  :variant="plan.popular ? 'elevated' : 'outlined'"
                  :color="plan.popular ? 'primary' : 'secondary'"
                  :to="plan.link"
                >
                  {{ plan.cta }}
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </div>

        <div class="comparison-section">
          <h2 class="section-title">Compare Features</h2>
          <div class="table-responsive">
            <v-table class="comparison-table">
              <thead>
                <tr>
                  <th class="feature-col">Features</th>
                  <th v-for="plan in currentPlans" :key="plan.name" class="plan-col">
                    {{ plan.name }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in currentComparison" :key="row.feature">
                  <td class="feature-name">{{ row.feature }}</td>
                  <td v-for="(plan, idx) in currentPlans" :key="idx" class="text-center">
                    <template v-if="typeof row.values[plan.id] === 'boolean'">
                      <v-icon v-if="row.values[plan.id]" color="success">mdi-check</v-icon>
                      <v-icon v-else color="grey-lighten-1">mdi-minus</v-icon>
                    </template>
                    <template v-else>
                      <span class="text-value">{{ row.values[plan.id] }}</span>
                    </template>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </div>

        <div v-if="activeCategory === 'Business'" class="enterprise-banner">
          <div class="content">
            <h3>Need a custom solution?</h3>
            <p>We offer tailored infrastructure, SLA, and custom procurement for large enterprises.</p>
          </div>
          <v-btn color="white" variant="outlined" size="large" to="/contact">
            Talk to Sales
          </v-btn>
        </div>

        <div class="faq-section">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <v-expansion-panels
            v-model="expanded"
            variant="accordion"
            class="faq-panels"
          >
            <v-expansion-panel
              v-for="faq in faqs"
              :key="faq.id"
              class="faq-accordion"
              elevation="0"
            >
              <v-expansion-panel-title class="faq-question">
                {{ faq.question }}
              </v-expansion-panel-title>
              <v-expansion-panel-text class="faq-answer">
                {{ faq.answer }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </div>
  </HomeTemplate>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import HomeTemplate from "../../templates/HomeTemplate";
import { setBrowserTitle } from "../../utils/web_util";

const isAnnual = ref(true);
const activeCategory = ref("Personal");
const expanded = ref(null);

const plansData = {
  Personal: [
    {
      id: "free",
      name: "Free",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "For casual learning",
      features: ["5 Quizzes per month", "Basic Analytics", "Community Support"],
      cta: "Get Started",
      popular: false,
      isEnterprise: false,
      link: "/register",
    },
    {
      id: "pro",
      name: "Pro",
      monthlyPrice: 12,
      annualPrice: 9,
      description: "For power users",
      features: ["Unlimited Quizzes", "Advanced Analytics", "No Ads", "Priority Support"],
      cta: "Start Free Trial",
      popular: true,
      isEnterprise: false,
      link: "/register?plan=pro",
    },
  ],
  Business: [
    {
      id: "team",
      name: "Team",
      monthlyPrice: 49,
      annualPrice: 39,
      description: "For small teams & schools",
      features: ["5 Team Seats", "Collaborative Editing", "Team Folders", "Admin Dashboard"],
      cta: "Start Team Trial",
      popular: true,
      isEnterprise: false,
      link: "/register?plan=team",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthlyPrice: 0,
      annualPrice: 0,
      description: "For large organizations",
      features: ["Unlimited Seats", "SSO (SAML)", "Dedicated Success Manager", "Custom SLA"],
      cta: "Contact Sales",
      popular: false,
      isEnterprise: true,
      link: "/contact",
    },
  ],
};

const comparisonData = {
  Personal: [
    { feature: "Quizzes per month", values: { free: "5", pro: "Unlimited" } },
    { feature: "Players per game", values: { free: "10", pro: "100" } },
    { feature: "Ad-free experience", values: { free: false, pro: true } },
    { feature: "Data Export", values: { free: false, pro: true } },
    { feature: "Support", values: { free: "Community", pro: "Priority Email" } },
  ],
  Business: [
    { feature: "Team Members", values: { team: "Up to 5", enterprise: "Unlimited" } },
    { feature: "SSO / SAML", values: { team: false, enterprise: true } },
    { feature: "API Access", values: { team: "Read-only", enterprise: "Full Access" } },
    { feature: "Audit Logs", values: { team: true, enterprise: true } },
    { feature: "Custom Branding", values: { team: true, enterprise: true } },
    { feature: "Training", values: { team: "Docs", enterprise: "Live Sessions" } },
  ],
};

const currentPlans = computed(() => plansData[activeCategory.value]);
const currentComparison = computed(() => comparisonData[activeCategory.value]);

const faqs = [
  {
    id: "faq1",
    question: "Can I change my plan later?",
    answer: "Yes! You can upgrade, downgrade, or cancel your subscription at any time.",
  },
  {
    id: "faq2",
    question: "How does the Enterprise plan work?",
    answer: "Contact our sales team. We will tailor a contract based on your seat requirements and security needs.",
  },
  {
    id: "faq3",
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all paid annual plans.",
  },
];

onMounted(() => {
  setBrowserTitle("Pricing & Plans");
});
</script>

<style lang="scss" src="./PricingPage.scss"></style>