import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useMessagesStore } from './useMessagesStore';
import { useCurrentUserStore } from './useCurrentUserStore';
import { useUsersStore } from './useUsersStore';

export const useMessagesWithUsersStore = defineStore(
  'messagesWithUsers',
  () => {
    const currentUserStore = useCurrentUserStore();
    const users2Store = useUsersStore();
    const messages2Store = useMessagesStore();

    const dataScenario = computed(() => {
      if (currentUserStore.dataScenario.scenario !== 'LOGGED_IN')
        return currentUserStore.dataScenario;
      if (users2Store.dataScenario.scenario !== 'VALID')
        return users2Store.dataScenario;
      if (messages2Store.dataScenario.scenario !== 'VALID')
        return messages2Store.dataScenario;

      const users = users2Store.dataScenario.data;
      return {
        scenario: 'VALID',
        data: messages2Store.dataScenario.data.map((x) => ({
          ...x,
          // TODO: needs to be memoised (or indexed) in store
          sender: users.find((user) => user.id === x.senderId),
          recipient: users.find((user) => user.id === x.recipientId),
        })),
      } as const;
    });

    const chatMessageScreenUiProps = computed(() => {
      if (dataScenario.value.scenario !== 'VALID') return [];
      if (currentUserStore.dataScenario.scenario !== 'LOGGED_IN') return [];

      return dataScenario.value.data.map((x) => {
        const isSenderCurrentUser =
          //TODO: What is causing this scenario check to be required???
          currentUserStore.dataScenario.scenario === 'LOGGED_IN' &&
          currentUserStore.dataScenario.data.id === x.sender?.id;
        return {
          name: isSenderCurrentUser ? 'me' : x.sender?.username,
          avatar: x.sender?.avatarUrl,
          text: [x.text],
          sent: isSenderCurrentUser,
        };
      });
    });

    return { dataScenario, chatMessageScreenUiProps };
  }
);
