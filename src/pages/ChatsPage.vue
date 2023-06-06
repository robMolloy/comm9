<template>
  <MessagingScreen
    v-model="text"
    :messages="messagesStore.getMessagesUiByUserId(currentUser.model?.id as string)"
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
const db = createPocketBaseDb();
const messagesStore = useMessagesStore();
const currentUser = useCurrentPocketBaseUser();
const usersStore = useUsersStore();
const route = useRoute();

const text = ref('ttext');
const onSubmit = async (e: string) => {
  const recipientUsername = route.params.username as string;
  const contact = usersStore.findUserByUsername(recipientUsername) ?? {
    id: undefined,
  };
  const contactId = contact.id;
  const senderId = currentUser.value.model?.id;

  const payload = { senderId, recipientId: contactId, text: e };
  await db.collection('messages').create(payload);
  text.value = '';
};
</script>
