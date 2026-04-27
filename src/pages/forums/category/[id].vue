<template>
  <ForumsCategory :id="id" />
</template>

<script lang="ts">
import ForumsCategory from '@/components/landing/forums/ForumsCategory.vue';

export default {
  name: "forums_category",
  components: {
    ForumsCategory
  },
  computed: {
    id(): string {
      return this.$route.params.id as string;
    }
  }
}
</script>
