import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useContactsStore } from './useContactsStore';
import { useMessagesStore } from './useMessagesStore';

export const useContactsWithRecentMessageStore = defineStore(
  'contactsWithRecentMessage',
  () => {
    const messages2Store = useMessagesStore();
    const contactsStore = useContactsStore();

    const dataScenario = computed(() => {
      if (contactsStore.dataScenario.scenario !== 'VALID')
        return contactsStore.dataScenario;
      if (messages2Store.dataScenario.scenario !== 'VALID')
        return messages2Store.dataScenario;

      const messages = messages2Store.dataScenario.data;
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

    const chatSidebarListUiProps = computed(() => {
      console.log(/*LL*/ 11, '123', 123);
      if (dataScenario.value.scenario !== 'VALID') return dataScenario.value;
      const rtn = dataScenario.value.data.map((x) => ({
        avatarUrl: x.avatarUrl,
        label: x.username,
        recentMessageText: x.recentMessage?.text,
      }));
      console.log(/*LL*/ 37, 'rtn', rtn);
      return { scenario: 'VALID', data: rtn };
    });

    return { dataScenario, chatSidebarListUiProps };
  }
);
