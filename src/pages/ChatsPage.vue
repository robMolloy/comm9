<template>
  <q-page padding>Chats {{ $route.params.id }} </q-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(/*LL*/ 9, 'route.params.id', route.params.id);
</script>
