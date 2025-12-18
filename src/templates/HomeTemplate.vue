<template>
  <div class="home-template">
    <HomeHeader :isReactive="isReactive" />
    <main class="home-template__content">
      <slot />
    </main>
    <HomeFooter />
  </div>
</template>

<script setup lang="ts">
import HomeHeader from "@components/home/HomeHeader.vue"
import HomeFooter from "@components/home/HomeFooter.vue"

defineProps<{
  isReactive?: boolean
}>()
</script>

<style lang="scss">
@use "@/styles/common.scss" as *;

.home-template {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(to top, $primary-color, #fff);

  &__content {
    flex: 1;
  }
}
</style>
