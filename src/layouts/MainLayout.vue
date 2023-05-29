<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="currentUser.isLoggedIn"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleMiniState"
        />
        <q-toolbar-title>Comm9</q-toolbar-title>
        <q-space />
        <NavigationTabs
          :tabs="[
            { label: 'Home', baseUrl: '/' },
            { label: 'Chats', baseUrl: '/chats' },
            { label: 'profiles', baseUrl: '/profiles' },
          ]"
        />

        <HeaderLogoutDropdown />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="currentUser.isLoggedIn"
      :value="true"
      show-if-above
      :mini="miniState"
      :width="300"
      :breakpoint="0"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <template v-if="usersStore.otherUsers === undefined">
          <ChatSidebarSkeletonList />
        </template>
        <template v-else-if="usersStore.otherUsers.length > 0">
          <ChatSidebarList
            :values="values"
            @click="(e) => $router.push(`/chats/${e.label}`)"
          />
        </template>
        <template v-else> Looks like it's just you in here... </template>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  useCurrentPocketBaseUser,
  ChatSidebarList,
  ChatSidebarSkeletonList,
} from 'src/modules';
import NavigationTabs from 'src/components/NavigationTabs.vue';
import HeaderLogoutDropdown from 'src/components/HeaderLogoutDropdown.vue';
import { useUsersStore } from 'src/stores/useUsersStore';

const currentUser = useCurrentPocketBaseUser();
const usersStore = useUsersStore();

const miniState = ref(true);
const toggleMiniState = () => (miniState.value = !miniState.value);

const log = console.log;

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
</script>
