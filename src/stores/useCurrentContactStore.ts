import { defineStore } from 'pinia';
import { userSchema } from 'src/modules';
import { computed, ref } from 'vue';
import { z } from 'zod';
import { useUsersStore } from './useUsersStore';

type TDataScenario =
  | { scenario: 'NO_CONTACT_FOUND' }
  | { scenario: 'VALID'; data: z.infer<typeof userSchema> };
type TInitDataScenario =
  | { scenario: 'NO_CONTACT_FOUND' }
  | { scenario: 'VALID'; data: z.infer<typeof userSchema> };

export const useCurrentChatContactStore = defineStore(
  'currentChatContactStore',
  () => {
    const usersStore = useUsersStore();
    const dataScenario = computed<TDataScenario>(() => {
      if (usersStore.dataScenario.scenario !== 'VALID')
        return { scenario: 'NO_CONTACT_FOUND' };
    });

    const data = ref<z.infer<typeof userSchema> | undefined>();
    const initDataScenario = computed<TInitDataScenario>(() => {
      if (data.value === undefined) return { scenario: 'NO_CONTACT_FOUND' };
      return { scenario: 'VALID', data: data.value };
    });
    const setByUserName = (payload: string) => {
      if (usersStore.dataScenario.scenario !== 'VALID')
        console.error('usersStore must be VALID to setCurrentChatContact');

      data.value = usersStore.findUserByUsername(payload);
    };

    const setUnknownData = (payload: unknown) => {
      const parseResponse = userSchema.safeParse(payload);

      if (!parseResponse.success)
        return setSafeDataScenario({ scenario: 'LOGGED_OUT' });
      setSafeDataScenario({ scenario: 'LOGGED_IN', data: parseResponse.data });
    };

    return { dataScenario, setUnknownData, setByUserName };
  }
);
