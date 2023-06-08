<template>
  <div>
    <template v-if="users2Store.data.scenario === 'ERROR'">
      Something has gone wrong
    </template>
    <template v-if="users2Store.data.scenario === 'LOADING'">
      <ChatSidebarSkeletonList />
    </template>
    <template v-if="users2Store.data.scenario === 'VALID'">
      <template v-if="users2Store.data.data.length === 0">
        Looks like it's just you in here...
      </template>
      <template v-else> Use the sidebar to choose someone to talk to </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ChatSidebarSkeletonList } from 'src/modules';
import { useUsers2Store } from 'src/stores/useUsers2Store';

const users2Store = useUsers2Store();
</script>
