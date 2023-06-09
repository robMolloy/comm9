<template>
  <q-btn-dropdown
    v-if="currentUserStore.dataScenario.scenario === 'LOGGED_IN'"
    :label="currentUserStore.dataScenario.data.username"
    flat
    dense
  >
    <template v-slot:label>
      <q-avatar color="white">
        <img :src="currentUserStore.dataScenario.data.avatarUrl" />
      </q-avatar>
    </template>
    <q-list>
      <q-item
        clickable
        v-close-popup
        @click="() => logoutWithPocketBase()"
        dense
      >
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
import { logoutWithPocketBase } from 'src/modules/useVuePocketbaseAuth/helpers/pocketBaseUserActions';
import { useCurrentUserStore } from 'src/stores/useCurrentUserStore.js';

const currentUserStore = useCurrentUserStore();
</script>
