<template>
  <v-card :class="className">
    <v-card-text class="labelled-container-content">
      <div class="labelled-header">
        <slot name="title" />
      </div>
      <div class="labelled-body">
        <slot />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  className?: string;
}>();
</script>

<style lang="scss" scoped>
@use "@styles/common.scss" as *;

.labelled-container-content {
  padding: 0 !important;

  .labelled-header {
    font-size: 1rem;
    font-weight: 600;
    background: linear-gradient(to right, $primary-color, $secondary-color) !important;
    padding: 5px 13px;
    color: #fff;
  }

  .labelled-body {
    padding: 0.5rem 10px;
  }
}
</style>
