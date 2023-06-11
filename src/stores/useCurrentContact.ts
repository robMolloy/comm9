import { defineStore } from 'pinia';
import { userSchema } from 'src/modules';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { z } from 'zod';
import { useUsersStore } from './useUsersStore';

export const useCurrentContactStore = defineStore('currentContactStore', () => {
  const route = useRoute();
  const usersStore = useUsersStore();

  const dataScenario = computed(() => {
    if (usersStore.dataScenario.scenario !== 'VALID')
      return usersStore.dataScenario;
    const recipientUsername = route.params.username as string;

    return {
      scenario: 'VALID',
      data: usersStore.findUserByUsername(recipientUsername),
    } as const;
  });

  return { dataScenario };
});
