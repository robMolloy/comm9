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
  const setSafeDataScenario = (payload: TDataScenario) =>
    (dataScenario.value = payload);

  const setSafeData = (payload: z.infer<typeof messagesSchema>) => {
    if (dataScenario.value.scenario !== 'VALID')
      return console.error('only add message data when scenario "VALID"');

    dataScenario.value = { scenario: 'VALID', data: payload };
  };

  const setUnknownData = (payload: unknown) => {
    const parseResponse = messagesSchema.safeParse(payload);

    if (!parseResponse.success)
      return setSafeDataScenario({ scenario: 'ERROR' });
    setSafeDataScenario({ scenario: 'VALID', data: parseResponse.data });
  };

  const clearData = () => {
    setSafeDataScenario({ scenario: 'LOADING' });
  };

  const addSafeData = (payload: z.infer<typeof messageSchema>) => {
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

    const parseResponse = messageSchema.safeParse(payload);

    if (!parseResponse.success)
      return setSafeDataScenario({ scenario: 'ERROR' });
    addSafeData(parseResponse.data);
  };

  return {
    dataScenario,
    setSafeDataScenario,
    setSafeData,
    setUnknownData,
    clearData,
    addSafeData,
    addUnknownData,
  };
});
