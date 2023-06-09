import { defineStore } from 'pinia';
import { messageSchema, messagesSchema } from 'src/modules';
import { ref } from 'vue';
import { z } from 'zod';
//
type TDataScenario =
  | { scenario: 'LOADING' }
  | { scenario: 'ERROR' }
  | { scenario: 'VALID'; data: z.infer<typeof messagesSchema> };

export const useMessagesStore = defineStore('messagesStore', () => {
  const dataScenario = ref<TDataScenario>({ scenario: 'LOADING' });
  const safeSetData = (payload: TDataScenario) =>
    (dataScenario.value = payload);

  const handleSetData = (payload: unknown) => {
    // if (payload === undefined) return safeSetData({ scenario: 'LOADING' });
    const parseResponse = messagesSchema.safeParse(payload);

    if (!parseResponse.success) return safeSetData({ scenario: 'ERROR' });
    safeSetData({ scenario: 'VALID', data: parseResponse.data });
  };

  const safeAddData = (payload: z.infer<typeof messageSchema>) => {
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

    const parseResponse = messageSchema.safeParse(payload);

    if (!parseResponse.success) return safeSetData({ scenario: 'ERROR' });
    safeAddData(parseResponse.data);
  };

  return {
    dataScenario,
    handleSetData,
    safeSetData,
    safeAddData,
    handleAddData,
  };
});
