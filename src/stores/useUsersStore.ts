import { defineStore } from 'pinia';
import { userSchema, usersSchema } from 'src/modules';
import { ref } from 'vue';
import { z } from 'zod';

type TDataScenario =
  | { scenario: 'LOADING' }
  | { scenario: 'ERROR' }
  | { scenario: 'VALID'; data: z.infer<typeof usersSchema> };

export const useUsersStore = defineStore('users', () => {
  const dataScenario = ref<TDataScenario>({ scenario: 'LOADING' });
  const setSafeDataScenario = (payload: TDataScenario) =>
    (dataScenario.value = payload);

  const setSafeData = (payload: z.infer<typeof usersSchema>) => {
    if (dataScenario.value.scenario !== 'VALID')
      return console.error('only safeSetUsers data when scenario "VALID"');

    dataScenario.value = { scenario: 'VALID', data: payload };
  };

  const setUnknownData = (payload: unknown) => {
    const parseResponse = usersSchema.safeParse(payload);

    if (!parseResponse.success)
      return setSafeDataScenario({ scenario: 'ERROR' });
    setSafeDataScenario({ scenario: 'VALID', data: parseResponse.data });
  };

  const clearData = () => {
    setSafeDataScenario({ scenario: 'LOADING' });
  };

  const addSafeData = (payload: z.infer<typeof userSchema>) => {
    if (dataScenario.value.scenario !== 'VALID')
      return console.error('only add message data when scenario "VALID"');

    dataScenario.value = {
      scenario: 'VALID',
      data: [...dataScenario.value.data, payload],
    };
  };

  const addUnknownData = (payload: unknown) => {
    if (dataScenario.value.scenario !== 'VALID')
      return console.error('only add message data when scenario "VALID"');

    const parseResponse = userSchema.safeParse(payload);

    if (!parseResponse.success)
      return setSafeDataScenario({ scenario: 'ERROR' });
    addSafeData(parseResponse.data);
  };

  const findUserByUsername = (username: string) => {
    return dataScenario.value.scenario === 'VALID'
      ? dataScenario.value.data.find((user) => user.username === username)
      : undefined;
  };

  return {
    dataScenario,
    setSafeDataScenario,
    setSafeData,
    setUnknownData,
    clearData,
    addSafeData,
    addUnknownData,
    findUserByUsername,
  };
});
