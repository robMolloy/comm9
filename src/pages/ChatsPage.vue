<template>
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
import { computed, onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCurrentUserStore } from 'src/stores/useCurrentUserStore';
import { useMessagesWithUsersStore } from 'src/stores/helperStores/useMessagesWithUsersStore';
import { useUsersStore } from 'src/stores/useUsersStore';
import { useCurrentChatContactStore } from 'src/stores/useCurrentContactStore';

defineEmits(['submit']);
const db = createPocketBaseDb();
const messagesWithUsersStore = useMessagesWithUsersStore();
const usersStore = useUsersStore();
const currentUserStore = useCurrentUserStore();
const currentChatContactStore = useCurrentChatContactStore();
const route = useRoute();

const currentChatContactId = computed(
  () => route.fullPath.split('/').slice(-1)[0]
);

const onEachRender = () =>
  currentChatContactStore.setByUserName(currentChatContactId.value);

onMounted(onEachRender);
onUpdated(onEachRender);

const text = ref('ttext');
const onSubmit = async (e: string) => {
  if (currentUserStore.dataScenario.scenario !== 'LOGGED_IN')
    return console.error("can't send messages if not logged in");

  const recipientUsername = route.params.username as string;
  const recipient = usersStore.findUserByUsername(recipientUsername);
  const recipientId = recipient?.id;
  const senderId = currentUserStore.dataScenario.data.id;

  const payload = { senderId, recipientId, text: e };
  await db.collection('messages').create(payload);
  text.value = '';
};
</script>
