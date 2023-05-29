import { defineStore } from 'pinia';
import { createPocketBaseDb } from 'src/modules';
import {
  pocketBaseUserModelSchema,
  pocketBaseUsersModelSchema,
} from 'src/modules/useVuePocketbaseAuth/schemas';
import { z } from 'zod';

const createInitialValues = () => ({
  started: false,
  db: createPocketBaseDb(),
  users: undefined as undefined | z.infer<typeof pocketBaseUsersModelSchema>,
});

export const useUsersStore = defineStore('users', {
  state: () => createInitialValues(),
  getters: {
    otherUsers: (state) => {
      if (state.users === undefined) return undefined;
      return state.users.filter((x) => x.id !== state.db.authStore.model?.id);
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
      this.users = undefined;
    },
    getAll() {
      (async () => {
        const users = await this.db.collection('users').getFullList();
        const response = pocketBaseUsersModelSchema.safeParse(users);
        if (response.success) this.users = response.data;
      })();
    },
    unsubscribe() {
      this.db.collection('users').unsubscribe('*');
    },
    subscribe() {
      this.db
        .collection('users')
        .subscribe('*', async ({ action, record: user }) => {
          if (action === 'create') {
            const response = pocketBaseUserModelSchema.safeParse(user);
            if (response.success)
              this.users =
                this.users === undefined
                  ? [response.data]
                  : [...this.users, response.data];
          }
        });
    },
  },
});
