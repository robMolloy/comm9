<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="currentUserStore.data.scenario === 'LOGGED_IN'"
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
      v-if="currentUserStore.data.scenario === 'LOGGED_IN'"
      :value="true"
      show-if-above
      :mini="miniState"
      :width="300"
      :breakpoint="0"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <template
          v-if="
            contactsWithRecentMessageStore.chatSidebarListUiProps.scenario ===
            'LOADING'
          "
        >
          <ChatSidebarSkeletonList />
        </template>
        <template
          v-if="
            contactsWithRecentMessageStore.chatSidebarListUiProps.scenario ===
            'VALID'
          "
        >
          <template
            v-if="
              contactsWithRecentMessageStore.chatSidebarListUiProps.data
                .length > 0
            "
          >
            <ChatSidebarList
              :values="
                contactsWithRecentMessageStore.chatSidebarListUiProps.data
              "
              @click="(e) => $router.push(`/chats/${e.label}`)"
              :active-username="currentUsername"
            />
          </template>
          <template v-else> Looks like it's just you in here... </template>
        </template>
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
import { computed, ref, watch } from 'vue';
import { ChatSidebarList, ChatSidebarSkeletonList } from 'src/modules';
import NavigationTabs from 'src/components/NavigationTabs.vue';
import HeaderLogoutDropdown from 'src/components/HeaderLogoutDropdown.vue';
import { useRoute } from 'vue-router';
import { useCurrentUserStore } from 'src/stores/useCurrentUserStore';
import { useContactsWithRecentMessageStore } from 'src/stores/useContactsWithRecentMessageStore';
import { useContactsStore } from 'src/stores/useContactsStore';

const currentUserStore = useCurrentUserStore();
const contactsStore = useContactsStore();
const contactsWithRecentMessageStore = useContactsWithRecentMessageStore();
const route = useRoute();
const currentUsername = ref<string | undefined>(undefined);
watch(
  route,
  (newValue) => (currentUsername.value = newValue.fullPath.split('/')[2]),
  { deep: true, immediate: true }
);

const miniState = ref(true);
const toggleMiniState = () => (miniState.value = !miniState.value);

const values = computed(() => {
  if (contactsWithRecentMessageStore.data.scenario !== 'VALID') return [];
  const rtn = contactsWithRecentMessageStore.data.data.map((x) => ({
    avatarUrl: x.avatarUrl,
    label: x.username,
    recentMessageText: x.recentMessage?.text,
  }));
  console.log(/*LL*/ 114, 'rtn', rtn);
  return rtn;
});
</script>
