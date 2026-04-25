<template>
  <ForumsThread :id="id" />
</template>

<script lang="ts">
import ForumsThread from '@/components/landing/forums/ForumsThread.vue';

export default {
  name: "forums_thread",
  components: {
    ForumsThread
  },
  computed: {
    id(): string {
      return this.$route.params?.id as string;
    }
  }
}
</script>
