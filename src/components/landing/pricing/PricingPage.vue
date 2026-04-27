<template>
  <BlankTemplate>
    <div class="pricing-page">
      <v-btn class="btn-back" :flat="true" @click="router.back()"><v-icon icon="mdi-arrow-left" /></v-btn>
      <div class="pricing-container">
        <div class="pricing-header">
          <h1 class="pricing-title">Edunity+</h1>
          <p class="pricing-subtitle">
            It's time to upgrade your learning experience!
          </p>
          <p class="pricing-description">
            Choose the perfect plan for your needs. From individual learners to large enterprises,
            we have solutions that scale with you. Get access to premium content, advanced analytics,
            and dedicated support.
          </p>
        </div>

        <div class="category-toggle">
          <div class="toggle-bg">
            <button v-for="cat in ['Personal', 'Business']" :key="cat" :class="{ active: activeCategory === cat }"
              @click="activeCategory = cat">
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="billing-toggle">
          <v-switch v-model="isAnnual" inset hide-details color="#000247" class="billing-chip">
            <template #label>
              <span class="billing-label">
                {{ isAnnual ? "Annual Billing" : "Monthly Billing" }}
              </span>
            </template>
          </v-switch>
          <v-chip v-if="isAnnual" size="x-small" class="discount-chip">
            SAVE 20%
          </v-chip>
        </div>


        <div class="plans-grid">
          <v-card v-for="(plan, index) in currentPlans" :key="index" class="plan-card"
            :class="{ popular: plan.popular, enterprise: plan.isEnterprise }" elevation="2">
            <v-card-text class="d-flex flex-column h-100">
              <div class="plan-header">
                <h2>{{ plan.name }}</h2>
                <v-chip v-if="plan.popular" size="small" color="secondary" class="popular-chip">
                  Most Popular
                </v-chip>
                <p class="plan-description">{{ plan.description }}</p>
              </div>

              <div class="price-box">
                <div v-if="!plan.isEnterprise">
                  <h3 class="price">
                    ${{ isAnnual ? plan.annualPrice : plan.monthlyPrice }}
                    <span class="period">/mo</span>
                  </h3>
                  <p v-if="isAnnual && plan.annualPrice > 0" class="billed-yearly">
                    Billed ${{ plan.annualPrice * 12 }} yearly
                  </p>
                  <p v-else-if="!isAnnual && plan.monthlyPrice > 0" class="billed-yearly">
                    Cancel anytime
                  </p>
                </div>
                <div v-else>
                  <h3 class="price">Custom</h3>
                  <p class="billed-yearly">Tailored pricing</p>
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
                <v-btn block size="large" class="cta-btn" :variant="plan.popular ? 'elevated' : 'outlined'"
                  :color="plan.popular ? 'primary' : 'secondary'" :to="plan.link">
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
                  <td v-for="plan in currentPlans" :key="plan.id" class="text-center">
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
          <v-expansion-panels v-model="expanded" variant="accordion" class="faq-panels">
            <v-expansion-panel v-for="faq in faqs" :key="faq.id" class="faq-accordion" elevation="0">
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
  </BlankTemplate>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { setBrowserTitle } from "@/utils/web_util";
import BlankTemplate from "@/templates/BlankTemplate.vue";
import { plansData, comparisonData, faqs } from "./pricing_attr";
import { useRouter } from "vue-router";

const router = useRouter();

const isAnnual = ref(true);
const activeCategory = ref("Personal");
const expanded = ref(null);

const currentPlans = computed(() => plansData[activeCategory.value]);
const currentComparison = computed(() => comparisonData[activeCategory.value]);

onMounted(() => {
  setBrowserTitle("Pricing & Plans");
});
</script>

<style lang="scss" scoped>
@use "./PricingPage.scss" as *;
</style>
