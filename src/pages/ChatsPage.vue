<template>
  <MessagingScreen
    v-model="text"
    :messages="messagesStore.messagesUI"
    @submit="(e) => onSubmit(e)"
  />
</template>

<script setup lang="ts">
import MessagingScreen from 'src/components/MessagingScreen.vue';
import { createPocketBaseDb, useCurrentPocketBaseUser } from 'src/modules';
import { useUsersStore } from 'src/stores/useUsersStore';
import { useMessagesStore } from 'src/stores/useMessagesStore';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

defineEmits(['submit']);
const messagesStore = useMessagesStore();

const db = createPocketBaseDb();
const route = useRoute();
console.log(/*LL*/ 9, 'route.params.username', route.params.username);

const currentUser = useCurrentPocketBaseUser();
const usersStore = useUsersStore();

const text = ref('ttext');
const onSubmit = async (e: string) => {
  const recipientUsername = route.params.username as string;
  const recipient = usersStore.findUserByUsername(recipientUsername) ?? {
    id: undefined,
  };
  const recipientId = recipient.id;
  const senderId = currentUser.value.model?.id;

  const payload = { senderId, recipientId, text: e };
  await db.collection('messages').create(payload);
  text.value = '';
};
</script>
