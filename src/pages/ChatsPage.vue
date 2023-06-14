<template>
  <!-- <template v-if="messagesWithUsersStore.dataScenario.scenario === 'VALID'">
    <MessagingScreen
      v-model="inputValue"
      :messages="messagesWithUsersStore.chatMessageScreenUiProps"
      @submit="(e) => onSubmit(e)"
    />
  </template> -->
  <template v-if="chatMessageScreenUiProps.dataScenario.scenario === 'VALID'">
    <MessagingScreen
      v-model="inputValue"
      :messages="chatMessageScreenUiProps.dataScenario.data"
      @submit="(e) => onSubmit(e)"
    />
  </template>
</template>

<script setup lang="ts">
import MessagingScreen from 'src/components/MessagingScreen.vue';
import { createPocketBaseDb } from 'src/modules';
import { computed, onMounted, onUpdated, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useCurrentUserStore } from 'src/stores/useCurrentUserStore';
import { useChatMessageScreenUiProps } from 'src/stores/helperStores/useChatMessageScreenUiPropsStore';
import { useUsersStore } from 'src/stores/useUsersStore';
import { useCurrentChatContactStore } from 'src/stores/useCurrentContactStore';

defineEmits(['submit']);
const db = createPocketBaseDb();
const usersStore = useUsersStore();
const currentUserStore = useCurrentUserStore();
const currentChatContactStore = useCurrentChatContactStore();
const chatMessageScreenUiProps = useChatMessageScreenUiProps();

const route = useRoute();

const currentChatContactId = computed(
  () => route.fullPath.split('/').slice(-1)[0]
);

const onEachRender = () =>
  currentChatContactStore.setByUserName(currentChatContactId.value);

onMounted(onEachRender);
onUpdated(onEachRender);

const inputValue = ref('ttext');
const onSubmit = async (text: string) => {
  console.log(/*LL*/ 41, { e: text });
  if (currentUserStore.dataScenario.scenario !== 'LOGGED_IN')
    return console.error("can't send messages if not logged in");

  const recipientUsername = route.params.username as string;
  const recipient = usersStore.findUserByUsername(recipientUsername);
  const sender = currentUserStore.dataScenario.data;

  const payload = { senderId: sender.id, recipientId: recipient?.id, text };
  await db.collection('messages').create(payload);
  inputValue.value = '';
};
</script>
