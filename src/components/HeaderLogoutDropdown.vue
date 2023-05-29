<template>
  <q-btn-dropdown v-if="currentUser.isLoggedIn" flat dense>
    <template v-slot:label>
      <q-avatar color="white">
        <img :src="currentUser.model?.avatarUrl ?? ''" />
      </q-avatar>
    </template>
    <q-list>
      <q-item clickable v-close-popup @click="() => currentUser.logout()" dense>
        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-avatar icon="logout" color="primary" text-color="white" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { useCurrentPocketBaseUser } from 'src/modules';

const currentUser = useCurrentPocketBaseUser();
</script>
