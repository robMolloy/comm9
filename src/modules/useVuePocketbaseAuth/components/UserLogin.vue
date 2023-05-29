<template>
  <div>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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

      <div>
        <q-btn label="Login" type="submit" color="primary" />
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
import { ref } from 'vue';

const isPasswordVisible = ref(false);

const emit = defineEmits<{
  (
    e: 'onSuccess',
    formValues: ReturnType<typeof createDefaultFormValues>
  ): void;
}>();

const createDefaultFormValues = (withDefaultValues = false) => {
  const randomToken = 6176;
  const x = `werty${randomToken}`;
  return withDefaultValues
    ? { username: x, password: x }
    : { username: '', password: '' };
};
const formValues = ref(createDefaultFormValues());

const onSubmit = async () => emit('onSuccess', formValues.value);
const onReset = () => (formValues.value = createDefaultFormValues());
const fillWithDefaultValues = () =>
  (formValues.value = createDefaultFormValues(true));
</script>
