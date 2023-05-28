<template>
  <div>
    <q-card v-if="!currentUser.isLoggedIn">
      <q-tabs v-model="tabName">
        <q-tab name="login" label="Login" />
        <q-tab name="signup" label="Signup" />
      </q-tabs>

      <q-tab-panels v-model="tabName" animated>
        <q-tab-panel name="login">
          <UserLogin />
        </q-tab-panel>
        <q-tab-panel name="signup">
          <UserSignup />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <div v-if="currentUser.isLoggedIn">
      <template v-if="usersStore.otherUsers === undefined">
        <ChatSidebarSkeletonList />
      </template>
      <template v-else>
        <ChatSidebarList :values="values" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { UserLogin, UserSignup, useCurrentPocketBaseUser } from 'src/modules';
import { useUsersStore } from 'src/stores/useUsersStore';
import ChatSidebarSkeletonList from 'src/modules/chatSidebar/components/ChatSidebarSkeletonList.vue';
import ChatSidebarList from 'src/modules/chatSidebar/components/ChatSidebarList.vue';
import { computed } from 'vue';

const currentUser = useCurrentPocketBaseUser();
const tabName = ref('login');

// const db = createPocketBaseDb();
const usersStore = useUsersStore();

const values = computed(() => {
  if (!usersStore.otherUsers)
    return [] as {
      avatarUrl: string;
      label: string;
    }[];
  return usersStore.otherUsers.map((user) => {
    return {
      avatarUrl: user.avatarUrl,
      label: user.username,
    };
  });
});

watch(
  currentUser,
  async () => {
    if (currentUser.value.isLoggedIn) {
      usersStore.init();
    }
  },
  { immediate: true }
);
</script>
