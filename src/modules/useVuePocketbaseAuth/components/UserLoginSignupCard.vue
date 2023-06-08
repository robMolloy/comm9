<template>
  <q-card>
    <q-tabs align="justify" v-model="tabName">
      <q-tab name="login" label="Login" />
      <q-tab name="signup" label="Signup" />
    </q-tabs>

    <q-separator />
    <q-tab-panels v-model="tabName" animated>
      <q-tab-panel name="login">
        <UserLogin @on-success="onLoginSucccess" />
      </q-tab-panel>
      <q-tab-panel name="signup">
        <UserSignup @on-success="onSignupSucccess" />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserLogin, UserSignup } from 'src/modules';

const tabName = ref('login');

const emit = defineEmits<{
  (
    e: 'onLoginSuccess',
    formValues: { username: string; password: string }
  ): void;
  (
    e: 'onSignupSuccess',
    formValues: {
      name: string;
      username: string;
      password: string;
      passwordConfirm: string;
      accept: boolean;
    }
  ): void;
}>();

const onLoginSucccess = async (formValues: {
  username: string;
  password: string;
}) => {
  emit('onLoginSuccess', formValues);
};
const onSignupSucccess = async (formValues: {
  name: string;
  username: string;
  password: string;
  passwordConfirm: string;
  accept: boolean;
}) => {
  console.log(/*LL*/ 56, 'formValues', formValues);
  emit('onSignupSuccess', formValues);
};
</script>
