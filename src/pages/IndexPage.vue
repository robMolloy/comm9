<template>
  <div>
    <template v-if="currentUserStore.data.scenario === 'LOGGED_OUT'">
      <UserLoginSignupCard
        @on-login-success="onLoginSucccess"
        @on-signup-success="onSignupSucccess"
      />
    </template>

    <div v-if="currentUserStore.data.scenario === 'LOGGED_IN'">
      <template v-if="users2Store.data.scenario === 'LOADING'">
        <ChatSidebarSkeletonList />
      </template>
      <template v-if="users2Store.data.scenario === 'VALID'">
        <template v-if="users2Store.data.data.length === 0">
          Looks like it's just you in here...
        </template>
        <template v-else>
          <ChatSidebarList :values="values" />
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ChatSidebarSkeletonList, ChatSidebarList } from 'src/modules';
import { useQuasar } from 'quasar';
import UserLoginSignupCard from 'src/modules/useVuePocketbaseAuth/components/UserLoginSignupCard.vue';
import { useCurrentUserStore } from 'src/stores/useCurrentUserStore';
import {
  loginWithPocketBase,
  signupAndLoginWithPocketBase,
} from 'src/modules/useVuePocketbaseAuth/helpers/pocketBaseUserActions';
import { useUsers2Store } from 'src/stores/useUsers2Store';

const $q = useQuasar();
const currentUserStore = useCurrentUserStore();

const onLoginSucccess = async (formValues: {
  username: string;
  password: string;
}) => {
  console.log(/*LL*/ 40, 'formValues', formValues);
  $q.loading.show();

  const response = await loginWithPocketBase(formValues);
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
  console.log(/*LL*/ 59, 'formValues', formValues);
  $q.loading.show();
  const response = await signupAndLoginWithPocketBase(formValues);

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

const users2Store = useUsers2Store();

const values = computed(() => [
  {
    avatarUrl: 'https://avatars.dicebear.com/api/identicon/jon.svg',
    label: 'jon',
  },
  {
    avatarUrl: 'https://avatars.dicebear.com/api/identicon/rob.svg',
    label: 'rob',
  },
]);
</script>
