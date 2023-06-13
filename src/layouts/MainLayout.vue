<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="currentUserStore.dataScenario.scenario === 'LOGGED_IN'"
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
            { label: 'Home', tabUrlMatcher: '', url: `/` },
            {
              label: 'Chats',
              tabUrlMatcher: 'chats',
              url: `/chats/${currentContactId}`,
            },
            { label: 'Profiles', tabUrlMatcher: 'profiles', url: `/profiles` },
          ]"
        />

        <HeaderLogoutDropdown />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="currentUserStore.dataScenario.scenario === 'LOGGED_IN'"
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
          v-if="chatSideBarListUiPropsStore.dataScenario.scenario === 'LOADING'"
        >
          <ChatSidebarSkeletonList />
        </template>
        <template
          v-if="chatSideBarListUiPropsStore.dataScenario.scenario === 'VALID'"
        >
          <template
            v-if="chatSideBarListUiPropsStore.dataScenario.data.length > 0"
          >
            <ChatSidebarList
              :values="chatSideBarListUiPropsStore.dataScenario.data"
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
        <template
          v-if="currentUserStore.dataScenario.scenario === 'LOGGED_OUT'"
        >
          <UserLoginSignupCard
            @on-login-success="onValidLoginFormSubmission"
            @on-signup-success="onValidSignupFormSubmission"
          />
        </template>
        <pre>
          {{ JSON.stringify(currentContactStore.dataScenario, undefined, 2) }}
        </pre>

        <template v-if="currentUserStore.dataScenario.scenario === 'LOGGED_IN'">
          <router-view />
        </template>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  ChatSidebarList,
  ChatSidebarSkeletonList,
  UserLoginSignupCard,
} from 'src/modules';
import NavigationTabs from 'src/components/NavigationTabs.vue';
import HeaderLogoutDropdown from 'src/components/HeaderLogoutDropdown.vue';
import { useRoute } from 'vue-router';
import { useCurrentUserStore } from 'src/stores/useCurrentUserStore';
import { useCurrentChatContactStore } from 'src/stores/useCurrentContactStore';
import { useQuasar } from 'quasar';
import { positiveNotification, warningNotification } from 'src/notifications';
import {
  loginWithPocketBase,
  signupAndLoginWithPocketBase,
} from 'src/modules/useVuePocketbaseAuth/helpers/pocketBaseUserActions';
import { useChatSideBarListUiPropsStore } from 'src/stores/helperStores/useChatSideBarListUiPropsStore';

const currentUserStore = useCurrentUserStore();
const currentContactStore = useCurrentChatContactStore();

const chatSideBarListUiPropsStore = useChatSideBarListUiPropsStore();
const route = useRoute();
const currentUsername = ref<string | undefined>(undefined);

// TODO: can this be computed?
watch(
  route,
  (newValue) => (currentUsername.value = newValue.fullPath.split('/')[2]),
  { deep: true, immediate: true }
);

const miniState = ref(true);
const toggleMiniState = () => (miniState.value = !miniState.value);

const currentContactId =
  currentContactStore.dataScenario.scenario === 'VALID'
    ? currentContactStore.dataScenario.data.id
    : '';

const $q = useQuasar();

type TLoginFormValues = { username: string; password: string };
const onValidLoginFormSubmission = async (formValues: TLoginFormValues) => {
  $q.loading.show();
  const response = await loginWithPocketBase(formValues);
  if (!response.success) positiveNotification(`${response.error.message}`);
  if (!response.success) warningNotification(`${response.error.message}`);
  $q.loading.hide();
};

const onValidSignupFormSubmission = async (formValues: {
  name: string;
  username: string;
  password: string;
  passwordConfirm: string;
  accept: boolean;
}) => {
  $q.loading.show();
  const response = await signupAndLoginWithPocketBase(formValues);

  if (response.success) {
    positiveNotification('Sign up success');
  } else {
    const errorMessageDetails = Object.values(response.error.data)
      .map((x) => x.message)
      .join(', ');
    warningNotification(`${response.error.message}: ${errorMessageDetails}`);
  }
  $q.loading.hide();
};
</script>
