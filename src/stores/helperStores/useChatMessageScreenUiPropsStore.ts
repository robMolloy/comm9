import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useCurrentUserStore } from '../useCurrentUserStore';
import { useCurrentContactMessagesStore } from './useCurrentContactMessagesStore';

export const useChatMessageScreenUiProps = defineStore(
  'chatMessageScreenUiProps',
  () => {
    const currentContactMessagesStore = useCurrentContactMessagesStore();
    const currentUserStore = useCurrentUserStore();

    const dataScenario = computed(() => {
      if (currentContactMessagesStore.dataScenario.scenario !== 'VALID')
        return currentContactMessagesStore.dataScenario;
      if (currentUserStore.dataScenario.scenario !== 'LOGGED_IN')
        return currentUserStore.dataScenario;

      const currentContactMessages =
        currentContactMessagesStore.dataScenario.data;
      return {
        scenario: 'VALID' as const,
        data: [
          ...currentContactMessages.map((x) => {
            const isSenderCurrentUser =
              //TODO: What is causing this scenario check to be required???
              currentUserStore.dataScenario.scenario === 'LOGGED_IN' &&
              currentUserStore.dataScenario.data.id === x.sender?.id;
            return {
              name: isSenderCurrentUser ? 'me' : x.sender?.username,
              avatar: x.sender?.avatarUrl,
              text: [x.text],
              sent: !!isSenderCurrentUser,
            };
          }),
        ],
      };
    });

    return { dataScenario };
  }
);
