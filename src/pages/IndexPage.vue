<template>
  <div>
    <q-card v-if="!currentUser.isLoggedIn">
      <q-tabs align="justify" v-model="tabName">
        <q-tab name="login" label="Login" />
        <q-tab name="signup" label="Signup" />
      </q-tabs>

      <q-tab-panels v-model="tabName" animated>
        <q-tab-panel name="login">
          <UserLogin />
        </q-tab-panel>
        <q-tab-panel name="signup">
          <UserSignup @on-success="onSignupSucccess" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <div v-if="currentUser.isLoggedIn">
      <template v-if="usersStore.otherUsers === undefined">
        <ChatSidebarSkeletonList />
      </template>
      <template v-else-if="usersStore.otherUsers.length > 0">
        <ChatSidebarList :values="values" />
      </template>
      <template v-else> Looks like it's just you in here... </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

import {
  UserLogin,
  UserSignup,
  useCurrentPocketBaseUser,
  ChatSidebarSkeletonList,
  ChatSidebarList,
} from 'src/modules';
import { useUsersStore } from 'src/stores/useUsersStore';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const currentUser = useCurrentPocketBaseUser();
const tabName = ref('login');

const onSignupSucccess = async (formValues: {
  name: string;
  username: string;
  password: string;
  passwordConfirm: string;
  accept: boolean;
}) => {
  $q.loading.show();
  await currentUser.value.signupAndLogin(formValues);
  $q.loading.hide();
};

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
