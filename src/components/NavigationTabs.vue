<template>
  <q-tabs :model-value="tabName">
    <q-tab
      v-for="tab in props.tabs"
      :key="tab.baseUrl"
      :name="tab.baseUrl"
      :label="tab.label"
      @click="() => $router.push(tab.baseUrl)"
    />
  </q-tabs>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
  tabs: { baseUrl: string; label: string }[];
}>();

const route = useRoute();
const tabName = computed(() => `/${route.fullPath.split('/')[1]}`);
</script>
