<template>Chats {{ $route.params.username }}</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
console.log(/*LL*/ 9, 'route.params.username', route.params.username);
</script>
