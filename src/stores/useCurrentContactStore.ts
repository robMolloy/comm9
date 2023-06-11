import { useCurrentUserStore } from './useCurrentUserStore';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useUsersStore } from './useUsersStore';

export const useCurrentContactStore = defineStore('currentContactStore', () => {
  const route = useRoute();
  const currentUserStore = useCurrentUserStore();
  const usersStore = useUsersStore();

  const dataScenario = computed(() => {
    if (currentUserStore.dataScenario.scenario !== 'LOGGED_IN')
      return currentUserStore.dataScenario;
    if (usersStore.dataScenario.scenario !== 'VALID')
      return usersStore.dataScenario;

    const currentContactUsername = route.params.username as string;
    const currentContact = usersStore.findUserByUsername(
      currentContactUsername
    );

    if (!currentContact) return { scenario: 'NO_USER_FOUND' } as const;
    return { scenario: 'VALID', data: currentContact } as const;
  });

  return { dataScenario } as const;
});
