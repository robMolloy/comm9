import { defineStore } from 'pinia';
import { userSchema } from 'src/modules';
import { computed, ref } from 'vue';
import { z } from 'zod';
import { useUsersStore } from './useUsersStore';

export const useCurrentChatContactStore = defineStore(
  'currentChatContactStore',
  () => {
    const usersStore = useUsersStore();
    const dataScenario = computed(() => {
      if (usersStore.dataScenario.scenario !== 'VALID')
        return usersStore.dataScenario;
      if (data.value === undefined)
        return { scenario: 'NO_CONTACT_FOUND' } as const;
      if (data.value === null) return { scenario: 'ERROR' } as const;
      return { scenario: 'VALID', data: data.value } as const;
    });

    const data = ref<z.infer<typeof userSchema> | undefined | null>();
    const setByUserName = (payload: string | undefined) => {
      if (usersStore.dataScenario.scenario !== 'VALID') {
        const msg = 'usersStore must be VALID to setCurrentChatContact';
        return console.error(msg);
      }
      if (payload === undefined) return undefined;

      data.value = usersStore.findUserByUsername(payload);
    };

    const setSafeData = (payload: z.infer<typeof userSchema>) => {
      if (
        dataScenario.value.scenario !== 'VALID' &&
        dataScenario.value.scenario !== 'NO_CONTACT_FOUND'
      ) {
        const msg =
          'usersStore must be VALID or NO_CONTACT_FOUND to setCurrentChatContact';
        return console.error(msg);
      }

      data.value = payload;
    };

    return { dataScenario, setByUserName, setSafeData };
  }
);
