<template>
  <div
    class="custom-breadcrumb"
    :class="className"
    :style="{ ...style, ...sx }"
  >
    <RouterLink to="/" class="home-link">
      <v-icon
        icon="mdi-home"
        class="home-icon"
        :style="{ color }"
      />
    </RouterLink>

    <span
      v-for="(item, index) in items"
      :key="item.label"
      class="crumb"
    >
      <v-icon
        icon="mdi-chevron-right"
        class="arrow-icon"
        :style="{ color }"
      />

      <RouterLink
        v-if="item.href && index !== items.length - 1"
        :to="item.href"
        :style="{ color }"
      >
        {{ item.label }}
      </RouterLink>

      <span v-else :style="{ color }">
        {{ item.label }}
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

interface Crumb {
  label: string;
  href?: string;
}

defineProps<{
  items: Crumb[];
  className?: string;
  color?: string;
  style?: Record<string, any>;
  sx?: Record<string, any>;
}>();
</script>

<style lang="scss" scoped>
@use "@styles/common.scss" as *;

.custom-breadcrumb {
  font-size: 0.95rem;
  margin-bottom: 2rem;
  color: #64748b;
  display: flex;
  align-items: center;

  a {
    color: $primary-color;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .home-link {
    display: flex;
    align-items: center;
  }

  .home-icon {
    font-size: 1.2rem;
    color: $primary-color;
    transform: translateY(1px);
  }

  .crumb {
    display: flex;
    align-items: center;

    span:last-child {
      color: #1e293b;
      font-weight: 500;
    }
  }
}
</style>
