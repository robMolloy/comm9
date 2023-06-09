import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useContactsWithRecentMessageStore } from './useContactsWithRecentMessageStore';

export const useChatSideBarListUiPropsStore = defineStore(
  'chatSideBarListUiPropsStore',
  () => {
    const contactsWithRecentMessageStore = useContactsWithRecentMessageStore();

    const dataScenario = computed(() => {
      if (contactsWithRecentMessageStore.dataScenario.scenario !== 'VALID')
        return contactsWithRecentMessageStore.dataScenario;

      const contactsWithRecentMessage =
        contactsWithRecentMessageStore.dataScenario.data;
      return {
        scenario: 'VALID',
        data: contactsWithRecentMessage.map((x) => ({
          avatarUrl: x.avatarUrl,
          label: x.username,
          recentMessageText: x.recentMessage?.text,
        })),
      } as const;
    });

    return { dataScenario };
  }
);
