import { defineStore } from 'pinia';
import { userSchema } from 'src/modules';
import { ref } from 'vue';
import { z } from 'zod';

type TDataScenario =
  | { scenario: 'LOGGED_OUT' }
  | { scenario: 'LOGGED_IN'; data: z.infer<typeof userSchema> };

export const useCurrentUserStore = defineStore('currentUser', () => {
  const dataScenario = ref<TDataScenario>({ scenario: 'LOGGED_OUT' });
  const setSafeDataScenario = (payload: TDataScenario) =>
    (dataScenario.value = payload);

  const setUnknownData = (payload: unknown) => {
    const parseResponse = userSchema.safeParse(payload);

    if (!parseResponse.success)
      return setSafeDataScenario({ scenario: 'LOGGED_OUT' });
    setSafeDataScenario({ scenario: 'LOGGED_IN', data: parseResponse.data });
  };

  //
  return { dataScenario, setUnknownData, setSafeDataScenario };
});
