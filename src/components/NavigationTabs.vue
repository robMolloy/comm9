<template>
  <q-tabs :model-value="selectedTabUrlMatcher">
    <q-tab
      v-for="tab in props.tabs"
      :key="tab.url"
      :name="tab.tabUrlMatcher"
      :label="tab.label"
      @click="() => $router.push(tab.url)"
    />
  </q-tabs>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  tabs: { url: string; label: string; tabUrlMatcher: string }[];
}>();

const route = useRoute();
const selectedTabUrlMatcher = computed(() => `${route.fullPath.split('/')[1]}`);
</script>
