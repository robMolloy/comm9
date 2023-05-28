<template>
  <q-item clickable v-ripple>
    <q-item-section avatar>
      <q-avatar size="xl">
        <img :src="props.avatarUrl" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>
        {{ props.label }}
      </q-item-label>
      <q-item-label caption>
        {{ props.recentMessage }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
const props = defineProps<{
  avatarUrl: string;
  label: string;
  recentMessage: string;
}>();
</script>
