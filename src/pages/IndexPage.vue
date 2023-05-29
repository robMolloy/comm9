<template>
  <div>
    <template v-if="!currentUser.isLoggedIn">
      <UserLoginSignupCard
        @on-login-success="onLoginSucccess"
        @on-signup-success="onSignupSucccess"
      />
    </template>

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
import { computed } from 'vue';
import {
  useCurrentPocketBaseUser,
  ChatSidebarSkeletonList,
  ChatSidebarList,
} from 'src/modules';
import { useUsersStore } from 'src/stores/useUsersStore';
import { useQuasar } from 'quasar';
import UserLoginSignupCard from 'src/modules/useVuePocketbaseAuth/components/UserLoginSignupCard.vue';

const $q = useQuasar();
const currentUser = useCurrentPocketBaseUser();

const onLoginSucccess = async (formValues: {
  username: string;
  password: string;
}) => {
  $q.loading.show();
  const response = await currentUser.value.login(formValues);
  if (!response.success)
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: `${response.error.message}`,
    });
  $q.loading.hide();
};
const onSignupSucccess = async (formValues: {
  name: string;
  username: string;
  password: string;
  passwordConfirm: string;
  accept: boolean;
}) => {
  $q.loading.show();
  const response = await currentUser.value.signupAndLogin(formValues);

  if (!response.success) {
    const errorMessageDetails = Object.values(response.error.data)
      .map((x) => x.message)
      .join(', ');
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: `${response.error.message}: ${errorMessageDetails}`,
    });
  }
  $q.loading.hide();
};

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
</script>
