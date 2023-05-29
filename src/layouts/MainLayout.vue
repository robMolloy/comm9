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
        <q-list>
          <template v-for="(li, j) in chatSidebarItemsFixture" :key="j">
            <ChatSidebarItem
              recentMessage="some caption"
              :avatarUrl="li.avatarUrl"
              :label="li.label"
            />
          </template>
          <template v-for="(_, j) in Array(30).fill(true)" :key="j">
            <ChatSidebarSkeletonItem />
          </template>
        </q-list>
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
import { ref } from 'vue';
import {
  ChatSidebarItem,
  ChatSidebarSkeletonItem,
  chatSidebarItemsFixture,
  useCurrentPocketBaseUser,
} from 'src/modules';
import NavigationTabs from 'src/components/NavigationTabs.vue';
import HeaderLogoutDropdown from 'src/components/HeaderLogoutDropdown.vue';

const currentUser = useCurrentPocketBaseUser();

const miniState = ref(true);
const toggleMiniState = () => (miniState.value = !miniState.value);
</script>
