import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useMessages2Store } from './useMessages2Store';
import { useCurrentUserStore } from './useCurrentUserStore';
import { useUsers2Store } from './useUsers2Store';

export const useMessagesWithUsersStore = defineStore(
  'messagesWithUsers',
  () => {
    const currentUserStore = useCurrentUserStore();
    const users2Store = useUsers2Store();
    const messages2Store = useMessages2Store();

    const data = computed(() => {
      if (currentUserStore.data.scenario !== 'LOGGED_IN')
        return currentUserStore.data;
      if (users2Store.data.scenario !== 'VALID') return users2Store.data;
      if (messages2Store.data.scenario !== 'VALID') return messages2Store.data;

      const users = users2Store.data.data;
      return {
        scenario: 'VALID',
        data: messages2Store.data.data.map((x) => ({
          ...x,
          // TODO: needs to be memoised (or indexed) in store
          sender: users.find((user) => user.id === x.senderId),
          recipient: users.find((user) => user.id === x.recipientId),
        })),
      } as const;
    });

    const chatMessageScreenUiProps = computed(() => {
      if (data.value.scenario !== 'VALID') return [];
      if (currentUserStore.data.scenario !== 'LOGGED_IN') return [];

      return data.value.data.map((x) => {
        const isSenderCurrentUser =
          //TODO: What is causing this scenario check to be required???
          currentUserStore.data.scenario === 'LOGGED_IN' &&
          currentUserStore.data.data.id === x.sender?.id;
        return {
          name: isSenderCurrentUser ? 'me' : x.sender?.username,
          avatar: x.sender?.avatarUrl,
          text: [x.text],
          sent: isSenderCurrentUser,
        };
      });
    });

    return { data, chatMessageScreenUiProps };
  }
);
