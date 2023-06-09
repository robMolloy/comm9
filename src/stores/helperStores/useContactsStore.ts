import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useUsersStore } from '../useUsersStore';
import { useCurrentUserStore } from '../useCurrentUserStore';

export const useContactsStore = defineStore('contacts', () => {
  const currentUserStore = useCurrentUserStore();
  const usersStore = useUsersStore();

  const dataScenario = computed(() => {
    if (currentUserStore.dataScenario.scenario !== 'LOGGED_IN')
      return { dataScenario: currentUserStore.dataScenario } as const;
    if (usersStore.dataScenario.scenario !== 'VALID')
      return usersStore.dataScenario;

    const currentUser = currentUserStore.dataScenario.data;
    return {
      scenario: 'VALID',
      data: [
        ...usersStore.dataScenario.data.filter((x) => x.id !== currentUser.id),
      ],
    } as const;
  });

  return { dataScenario };
});
