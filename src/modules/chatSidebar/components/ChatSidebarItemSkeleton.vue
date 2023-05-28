<template>
  <q-item clickable v-ripple>
    <q-item-section avatar>
      <q-avatar size="xl">
        <q-skeleton type="QAvatar" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>
        <q-skeleton type="text" />
      </q-item-label>
      <q-item-label caption>
        <q-skeleton type="text" />
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts"></script>
