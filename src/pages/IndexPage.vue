<template>
  <div>
    <template v-if="usersStore.dataScenario.scenario === 'ERROR'">
      Something has gone wrong
    </template>
    <template v-if="usersStore.dataScenario.scenario === 'LOADING'">
      <ChatSidebarSkeletonList />
    </template>
    <template v-if="usersStore.dataScenario.scenario === 'VALID'">
      <template v-if="usersStore.dataScenario.data.length === 0">
        Looks like it's just you in here...
      </template>
      <template v-else> Use the sidebar to choose someone to talk to </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ChatSidebarSkeletonList } from 'src/modules';
import { useUsersStore } from 'src/stores/useUsersStore.js';

const usersStore = useUsersStore();
</script>
