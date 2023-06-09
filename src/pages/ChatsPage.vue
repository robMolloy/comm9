<template>
  <!-- <template v-if="currentUserStore.dataScenario.scenario === 'LOGGED_IN'">
    <MessagingScreen
      v-model="text"
      :messages="shownMessages"
      @submit="(e) => onSubmit(e)"
    />
  </template> -->
  <template v-if="messagesWithUsersStore.dataScenario.scenario === 'VALID'">
    <MessagingScreen
      v-model="text"
      :messages="messagesWithUsersStore.chatMessageScreenUiProps"
      @submit="(e) => onSubmit(e)"
    />
  </template>
</template>

<script setup lang="ts">
import MessagingScreen from 'src/components/MessagingScreen.vue';
import { createPocketBaseDb } from 'src/modules';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCurrentUserStore } from 'src/stores/useCurrentUserStore.js';
import { useMessagesWithUsersStore } from 'src/stores/helperStores/useMessagesWithUsersStore.js';
import { useUsersStore } from 'src/stores/useUsersStore.js';

defineEmits(['submit']);
const db = createPocketBaseDb();
const messagesWithUsersStore = useMessagesWithUsersStore();
const users2Store = useUsersStore();
const currentUserStore = useCurrentUserStore();
const route = useRoute();

const text = ref('ttext');
const onSubmit = async (e: string) => {
  if (currentUserStore.dataScenario.scenario !== 'LOGGED_IN')
    return console.error("can't send messages if not logged in");

  const recipientUsername = route.params.username as string;
  const recipient = users2Store.findUserByUsername(recipientUsername);
  const recipientId = recipient?.id;
  const senderId = currentUserStore.dataScenario.data.id;

  const payload = { senderId, recipientId, text: e };
  await db.collection('messages').create(payload);
  text.value = '';
};
</script>
