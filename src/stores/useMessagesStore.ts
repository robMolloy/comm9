import { defineStore } from 'pinia';
import { createPocketBaseDb } from 'src/modules';
import {
  messageSchema,
  messagesSchema,
} from 'src/modules/useVuePocketbaseAuth/schemas';
import { z } from 'zod';

const createInitialValues = () => ({
  started: false,
  db: createPocketBaseDb(),
  data: undefined as undefined | z.infer<typeof messagesSchema>,
});

export const useMessagesStore = defineStore('messages', {
  state: () => createInitialValues(),
  getters: {
    messagesUI: (state) => {
      if (state.data === undefined) return [];
      return state.data.map((x) => ({
        name: x.senderId,
        avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
        text: [x.text],
        sent: true,
      }));
    },
  },
  actions: {
    start() {
      if (this.started) return;
      (async () => {
        this.started = true;
        await this.getAll();
        this.subscribe();
      })();
    },
    stop() {
      if (!this.started) return;
      this.started = false;
      this.unsubscribe();
      this.data = undefined;
    },
    getAll() {
      (async () => {
        const data = await this.db.collection('messages').getFullList();
        const response = messagesSchema.safeParse(data);
        if (response.success) this.data = response.data;
      })();
    },
    unsubscribe() {
      this.db.collection('messages').unsubscribe('*');
    },
    subscribe() {
      this.db
        .collection('messages')
        .subscribe('*', async ({ action, record }) => {
          if (action === 'create') {
            const response = messageSchema.safeParse(record);
            if (response.success)
              this.data = [...(this.data ?? []), response.data];
          }
        });
    },
  },
});
