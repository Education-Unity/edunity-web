<template>
  <!-- <div
    class="portal-template"
    :class="{ 'sidebar-collapsed': !isPortalSidebarOpen }"
  >
    <div class="portal-template__sidebar">
      <PortalSidebar
        :classroomData="classroomData"
        activeTab="dashboard"
      />
    </div>

    <div class="portal-template__main">
      <header class="portal-template__header">
        <div class="portal-template__header-inner">
          <PortalNavbar
            :classroomData="classroomData"
            title="Portal"
            badge="Role"
            badgeColor="grey"
            branchName="Branch"
          />
        </div>
      </header>

      <main class="portal-template__content">
        <slot />
      </main>
    </div>
  </div> -->
</template>

<!-- <script setup lang="ts">
import { onMounted } from "vue"
import { useAppStore } from "@/stores/useAppStore"
import PortalSidebar from "@components/portal/PortalSidebar.vue"
import PortalNavbar from "@components/portal/PortalNavbar.vue"

defineProps<{
  classroomData: any
}>()

const appStore = useAppStore()
const isPortalSidebarOpen = appStore.isPortalSidebarOpen

onMounted(() => {
  document.title = "Portal"
})
</script> -->

<style lang="scss">
.portal-template {
  display: grid;
  grid-template-columns: 280px 1fr;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  transition: all 0.3s ease;

  &.sidebar-collapsed {
    grid-template-columns: 80px 1fr;
  }

  &__main {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
  }

  &__header {
    backdrop-filter: blur(4px);
    z-index: 10;
  }

  &__header-inner {
    background: #fff;
    border-bottom: 1px solid rgba(14, 44, 71, 0.06);
  }

  &__content {
    flex: 1;
    overflow-y: auto;
    background: #f8fafc;
  }
}
</style>
