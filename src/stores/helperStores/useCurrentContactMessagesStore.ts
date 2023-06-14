import { useMessagesWithUsersStore } from './useMessagesWithUsersStore';
import { useCurrentChatContactStore } from './../useCurrentContactStore';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useUsersStore } from '../useUsersStore';
import { useCurrentUserStore } from '../useCurrentUserStore';

export const useCurrentContactMessagesStore = defineStore(
  'currentContactMessagesStore',
  () => {
    const currentUserStore = useCurrentUserStore();
    const usersStore = useUsersStore();
    const currentChatContactStore = useCurrentChatContactStore();
    const messagesWithUsersStore = useMessagesWithUsersStore();

    const dataScenario = computed(() => {
      if (currentUserStore.dataScenario.scenario !== 'LOGGED_IN')
        return currentUserStore.dataScenario;
      if (usersStore.dataScenario.scenario !== 'VALID')
        return usersStore.dataScenario;
      if (currentChatContactStore.dataScenario.scenario !== 'VALID')
        return currentChatContactStore.dataScenario;
      if (messagesWithUsersStore.dataScenario.scenario !== 'VALID')
        return messagesWithUsersStore.dataScenario;

      const currentUser = currentUserStore.dataScenario.data;
      const currentChatContact = currentChatContactStore.dataScenario.data;
      return {
        scenario: 'VALID',
        data: [
          ...messagesWithUsersStore.dataScenario.data.filter((x) => {
            return (
              (x.senderId === currentUser.id &&
                x.recipientId === currentChatContact.id) ||
              (x.recipientId === currentUser.id &&
                x.senderId === currentChatContact.id)
            );
          }),
        ],
      } as const;
    });

    return { dataScenario };
  }
);
