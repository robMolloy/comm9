<template>
  <q-list>
    <ChatSidebarItem
      v-for="(prop, j) in props.values"
      :active="props.activeUsername === prop.label"
      :avatar-url="prop.avatarUrl ?? 'no info'"
      :label="prop.label ?? 'no info'"
      :recent-message-text="prop.recentMessageText ?? 'no messages yet'"
      :key="j"
      @click="() => $emit('click', prop)"
    />
  </q-list>
</template>

<script setup lang="ts">
import { ChatSidebarItem } from 'src/modules';

const props = defineProps<{
  values: { avatarUrl?: string; label?: string; recentMessageText?: string }[];
  activeUsername?: string;
}>();

defineEmits<{
  (e: 'click', values: { avatarUrl?: string; label?: string }): void;
}>();
</script>
