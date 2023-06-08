import { defineStore } from 'pinia';
import { userSchema, usersSchema } from 'src/modules';
import { ref } from 'vue';
import { z } from 'zod';

type TDataScenarios =
  | { scenario: 'LOADING' }
  | { scenario: 'ERROR' }
  | { scenario: 'VALID'; data: z.infer<typeof usersSchema> };

export const useUsers2Store = defineStore('users2', () => {
  // const data = ref<TData>({ scenario: 'LOADING' });
  const data = ref<TDataScenarios>({ scenario: 'LOADING' });
  const safeSetData = (payload: TDataScenarios) => (data.value = payload);

  const handleSetData = (payload: unknown) => {
    // if (payload === undefined) return safeSetData({ scenario: 'LOADING' });
    const parseResponse = usersSchema.safeParse(payload);

    if (!parseResponse.success) return safeSetData({ scenario: 'ERROR' });
    safeSetData({ scenario: 'VALID', data: parseResponse.data });
  };

  const safeAddData = (payload: z.infer<typeof userSchema>) => {
    if (data.value.scenario !== 'VALID')
      return console.error('only add message data when scenario "VALID"');

    data.value = { scenario: 'VALID', data: [...data.value.data, payload] };
  };

  const handleAddData = (payload: unknown) => {
    if (data.value.scenario !== 'VALID')
      return console.error('only add message data when scenario "VALID"');

    const parseResponse = userSchema.safeParse(payload);

    if (!parseResponse.success) return safeSetData({ scenario: 'ERROR' });
    safeAddData(parseResponse.data);
  };

  const findUserByUsername = (username: string) => {
    return data.value.scenario === 'VALID'
      ? data.value.data.find((user) => user.username === username)
      : undefined;
  };

  return {
    data,
    handleSetData,
    safeSetData,
    safeAddData,
    handleAddData,
    findUserByUsername,
  };
});