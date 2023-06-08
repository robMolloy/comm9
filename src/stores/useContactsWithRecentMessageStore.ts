import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useContactsStore } from './useContactsStore';
import { useMessages2Store } from './useMessages2Store';

export const useContactsWithRecentMessageStore = defineStore(
  'contactsWithRecentMessage',
  () => {
    const messages2Store = useMessages2Store();
    const contactsStore = useContactsStore();

    const data = computed(() => {
      if (contactsStore.data.scenario !== 'VALID') return contactsStore.data;
      if (messages2Store.data.scenario !== 'VALID') return messages2Store.data;

      const messages = messages2Store.data.data;
      const contacts = contactsStore.data.data;
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
      if (data.value.scenario !== 'VALID') return data.value;
      const rtn = data.value.data.map((x) => ({
        avatarUrl: x.avatarUrl,
        label: x.username,
        recentMessageText: x.recentMessage?.text,
      }));
      console.log(/*LL*/ 37, 'rtn', rtn);
      return { scenario: 'VALID', data: rtn };
    });

    return { data, chatSidebarListUiProps };
  }
);
