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

        <q-tabs v-model="tabName">
          <q-tab name="/" label="Home" @click="() => $router.push('/')" />
          <q-tab
            name="/chats"
            label="Chats"
            @click="() => $router.push('/chats')"
          />
          <q-tab
            name="/profiles"
            label="Profiles"
            @click="() => $router.push('/profiles')"
          />
        </q-tabs>
        <q-btn
          v-if="currentUser.isLoggedIn"
          color="secondary"
          @click="() => currentUser.logout()"
        >
          logout
        </q-btn>
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
import { ref, computed } from 'vue';
import {
  ChatSidebarItem,
  ChatSidebarSkeletonItem,
  chatSidebarItemsFixture,
  useCurrentPocketBaseUser,
} from 'src/modules';
import { useRoute } from 'vue-router';

const currentUser = useCurrentPocketBaseUser();

const miniState = ref(true);
const toggleMiniState = () => (miniState.value = !miniState.value);
const route = useRoute();
const tabName = computed(() => `/${route.fullPath.split('/')[1]}`);
</script>
