<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        v-model="formValues.name"
        label="Name *"
        :rules="[(val) => (val && val.length > 0) || 'Cannot be blank']"
        autofocus
      />
      <q-input
        v-model="formValues.username"
        label="Username *"
        :rules="[(val) => (val && val.length > 0) || 'Cannot be blank']"
      />

      <q-input
        :type="isPasswordVisible ? 'text' : 'password'"
        v-model="formValues.password"
        label="Password *"
        :rules="[
          (val) => !!val || 'Cannot be blank',
          (val) => val.length >= 7 || 'Must be at least 7 characters long',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPasswordVisible ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click="() => (isPasswordVisible = !isPasswordVisible)"
          />
        </template>
      </q-input>

      <q-input
        v-model="formValues.passwordConfirm"
        :type="isPasswordConfirmVisible ? 'text' : 'password'"
        label="ConfirmPassword *"
        :rules="[
          (val) => val === formValues.password || 'Must match password field',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPasswordConfirmVisible ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click="
              () => (isPasswordConfirmVisible = !isPasswordConfirmVisible)
            "
          />
        </template>
      </q-input>

      <q-toggle
        v-model="formValues.accept"
        label="I accept the license and terms"
      />

      <div>
        <q-btn label="Sign Up" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
        <q-btn
          label="Fill with default values"
          @click="fillWithDefaultValues"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const $q = useQuasar();
const isPasswordVisible = ref(false);
const isPasswordConfirmVisible = ref(false);

const emit = defineEmits<{
  (
    e: 'onSuccess',
    formValues: ReturnType<typeof createDefaultFormValues>
  ): void;
}>();

const createDefaultFormValues = (withDefaultValues = false) => {
  const randomToken = Math.floor(Math.random() * 10000);
  const x = `werty${randomToken}`;
  return withDefaultValues
    ? { name: x, username: x, password: x, passwordConfirm: x, accept: true }
    : {
        name: '',
        username: '',
        password: '',
        passwordConfirm: '',
        accept: false,
      };
};
const formValues = ref(createDefaultFormValues());

const onSubmit = async () => {
  if (formValues.value.accept !== true) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first',
    });
  } else {
    emit('onSuccess', formValues.value);
  }
};

const onReset = () => (formValues.value = createDefaultFormValues());
const fillWithDefaultValues = () =>
  (formValues.value = createDefaultFormValues(true));
</script>
