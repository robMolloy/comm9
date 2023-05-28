<template>
  <q-list>
    <ChatSidebarSkeletonItem
      v-for="(_, j) in Array(props.quantity).fill(undefined)"
      :key="j"
    />
  </q-list>
</template>

<script setup lang="ts">
import { ChatSidebarSkeletonItem } from 'src/modules';

const props = withDefaults(defineProps<{ quantity?: number }>(), {
  quantity: 15,
});
</script>
