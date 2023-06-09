import { defineStore } from 'pinia';
import { userSchema } from 'src/modules';
import { ref } from 'vue';
import { z } from 'zod';

type TData =
  // | { scenario: 'LOADING' }
  | { scenario: 'LOGGED_OUT' }
  | { scenario: 'LOGGED_IN'; data: z.infer<typeof userSchema> };

export const useCurrentUserStore = defineStore('currentUser', () => {
  // const data = ref<TData>({ scenario: 'LOADING' });
  const data = ref<TData>({ scenario: 'LOGGED_OUT' });
  const safeSetData = (payload: TData) => (data.value = payload);

  const handleSetData = (payload: unknown) => {
    // if (payload === undefined) return safeSetData({ scenario: 'LOADING' });
    const parseResponse = userSchema.safeParse(payload);

    if (!parseResponse.success) return safeSetData({ scenario: 'LOGGED_OUT' });
    safeSetData({ scenario: 'LOGGED_IN', data: parseResponse.data });
  };

  //
  return { data, handleSetData, safeSetData };
});
