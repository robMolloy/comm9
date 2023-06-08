<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%">
      <q-chat-message
        v-for="(message, j) in messages"
        :key="j"
        :name="message.name"
        :avatar="message.avatar"
        :text="message.text"
        :sent="!message.sent"
      />
    </div>
  </div>
  <q-footer class="q-pa-sm">
    <q-input
      dense
      standout
      bg-color="white"
      rounded
      :model-value="props.modelValue"
      input-class="text-black"
      label="input"
      @update:model-value="(e) => $emit('update:model-value', e)"
    >
      <template v-slot:after>
        <q-btn
          round
          icon="send"
          text-color="white"
          flat
          @click="() => $emit('submit', props.modelValue)"
        />
      </template>
    </q-input>
  </q-footer>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'submit', text: string): void;
  (e: 'update:model-value', text: string): void;
}>();
const props = defineProps<{
  modelValue: string;
  messages: {
    name?: string;
    avatar?: string;
    text?: string[];
    sent?: boolean;
  }[];
}>();
</script>
