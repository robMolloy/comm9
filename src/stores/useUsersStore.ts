import { defineStore } from 'pinia';
import { userSchema, usersSchema } from 'src/modules';
import { ref } from 'vue';
import { z } from 'zod';

type TDataScenario =
  | { scenario: 'LOADING' }
  | { scenario: 'ERROR' }
  | { scenario: 'VALID'; data: z.infer<typeof usersSchema> };

export const useUsersStore = defineStore('users2', () => {
  const dataScenario = ref<TDataScenario>({ scenario: 'LOADING' });
  const safeSetData = (payload: TDataScenario) =>
    (dataScenario.value = payload);

  const handleSetData = (payload: unknown) => {
    // if (payload === undefined) return safeSetData({ scenario: 'LOADING' });
    const parseResponse = usersSchema.safeParse(payload);

    if (!parseResponse.success) return safeSetData({ scenario: 'ERROR' });
    safeSetData({ scenario: 'VALID', data: parseResponse.data });
  };

  const safeAddData = (payload: z.infer<typeof userSchema>) => {
    if (dataScenario.value.scenario !== 'VALID')
      return console.error('only add message data when scenario "VALID"');

    dataScenario.value = {
      scenario: 'VALID',
      data: [...dataScenario.value.data, payload],
    };
  };

  const handleAddData = (payload: unknown) => {
    if (dataScenario.value.scenario !== 'VALID')
      return console.error('only add message data when scenario "VALID"');

    const parseResponse = userSchema.safeParse(payload);

    if (!parseResponse.success) return safeSetData({ scenario: 'ERROR' });
    safeAddData(parseResponse.data);
  };

  const findUserByUsername = (username: string) => {
    return dataScenario.value.scenario === 'VALID'
      ? dataScenario.value.data.find((user) => user.username === username)
      : undefined;
  };

  return {
    dataScenario,
    handleSetData,
    safeSetData,
    safeAddData,
    handleAddData,
    findUserByUsername,
  };
});
