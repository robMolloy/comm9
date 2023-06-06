import { defineStore } from 'pinia';
import { createPocketBaseDb, useCurrentPocketBaseUser } from 'src/modules';
import {
  messageSchema,
  messagesSchema,
} from 'src/modules/useVuePocketbaseAuth/schemas';
import { z } from 'zod';
import { useUsersStore } from './useUsersStore';

const createInitialValues = () => ({
  started: false,
  db: createPocketBaseDb(),
  data: undefined as undefined | z.infer<typeof messagesSchema>,
});

export const useMessagesStore = defineStore('messages2', {
  state: () => createInitialValues(),
  getters: {
    getMessagesUi: (state) => {
      if (state.data === undefined) return [];
      return state.data.map((x) => ({
        name: x.senderId,
        avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
        text: [x.text],
        sent: true,
      }));
    },
    getMessagesUiByUserId: (state) => (otherUserId: string) => {
      if (state.data === undefined) return [];
      const userstore = useUsersStore();
      const usersIndexedById = userstore.indexedById ?? {};

      const otherUser = usersIndexedById[otherUserId as string] ?? {};
      const currentUser = useCurrentPocketBaseUser().value.model ?? {};

      return state.data
        .filter(
          (x) => x.recipientId === otherUserId || x.senderId === otherUserId
        )
        .map((x) => {
          return {
            name: x.senderId === currentUser.id ? 'me' : otherUser.username,
            avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
            text: [x.text],
            sent: x.senderId === otherUserId,
          };
        });
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
        const data = await this.db
          .collection('messages')
          .getFullList({ expand: 'senderId' });
        console.log(/*LL*/ 48, 'data', data);
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
            console.log(/*LL*/ 61, 'record', record);
            const response = messageSchema.safeParse(record);
            if (response.success)
              this.data = [...(this.data ?? []), response.data];
          }
        });
    },
  },
});
