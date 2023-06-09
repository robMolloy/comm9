import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useContactsStore } from './useContactsStore';
import { useMessagesStore } from '../useMessagesStore';
import { useCurrentUserStore } from '../useCurrentUserStore';

export const useContactsWithRecentMessageStore = defineStore(
  'contactsWithRecentMessage',
  () => {
    const currentUserStore = useCurrentUserStore();
    const messagesStore = useMessagesStore();
    const contactsStore = useContactsStore();

    const dataScenario = computed(() => {
      if (currentUserStore.dataScenario.scenario !== 'LOGGED_IN')
        return currentUserStore.dataScenario;
      if (contactsStore.dataScenario.scenario !== 'VALID')
        return contactsStore.dataScenario;
      if (messagesStore.dataScenario.scenario !== 'VALID')
        return messagesStore.dataScenario;

      const messages = messagesStore.dataScenario.data;
      const contacts = contactsStore.dataScenario.data;
      return {
        scenario: 'VALID',
        data: contacts.map((contact) => ({
          ...contact,
          //TODO: currently finding first, not last
          recentMessage: messages.find(({ senderId, recipientId }) => {
            return senderId === contact.id || recipientId === contact.id;
          }),
        })),
      } as const;
    });

    return { dataScenario };
  }
);
