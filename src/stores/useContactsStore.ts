import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useUsers2Store } from './useUsers2Store';
import { useCurrentUserStore } from './useCurrentUserStore';

export const useContactsStore = defineStore('contacts2', () => {
  const currentUsersStore = useCurrentUserStore();
  const users2Store = useUsers2Store();

  const data = computed(() => {
    if (currentUsersStore.data.scenario !== 'LOGGED_IN')
      return currentUsersStore.data;
    if (users2Store.data.scenario !== 'VALID') return users2Store.data;

    const currentUser = currentUsersStore.data.data;
    return {
      scenario: 'VALID',
      data: users2Store.data.data.filter((x) => x.id !== currentUser.id),
    } as const;
  });

  return { data };
});
