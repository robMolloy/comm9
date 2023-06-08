import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useContactsWithRecentMessageStore } from './useContactsWithRecentMessageStore';

export const useChatSideBarListUiPropsStore = defineStore(
  'chatSideBarListUiPropsStore',
  () => {
    const contactsWithRecentMessageStore = useContactsWithRecentMessageStore();

    const data = computed(() => {
      if (contactsWithRecentMessageStore.data.scenario !== 'VALID')
        return contactsWithRecentMessageStore.data;

      const contactsWithRecentMessage =
        contactsWithRecentMessageStore.data.data;
      return {
        scenario: 'VALID',
        data: contactsWithRecentMessage.map((x) => ({
          avatarUrl: x.avatarUrl,
          label: x.username,
          recentMessageText: x.recentMessage?.text,
        })),
      } as const;
    });

    return { data };
  }
);
