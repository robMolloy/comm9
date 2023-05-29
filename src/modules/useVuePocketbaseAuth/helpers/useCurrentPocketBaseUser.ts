import { computed, ref } from 'vue';
import { createPocketBaseDb } from './createPocketBaseDb';
import { z } from 'zod';
import {
  loginWithPocketBase,
  logoutWithPocketBase,
  signupAndLoginWithPocketBase,
  signupWithPocketBase,
} from './pocketBaseUserActions';
import { useUsersStore } from 'src/stores/useUsersStore';

const pocketBaseUserModelSchema = z
  .object({
    id: z.string(),
    username: z.string(),
    avatar: z.string(),
    avatarUrl: z.string(),
    collectionId: z.string(),
    collectionName: z.string(),
    created: z.string(),
    email: z.string(),
    emailVisibility: z.boolean(),
    name: z.string(),
    updated: z.string(),
    verified: z.boolean(),
  })
  .passthrough()
  .deepPartial();
const parsePocketBaseUserModelWithDefaults = (model: unknown) => {
  const parseResponse = pocketBaseUserModelSchema.safeParse(model);
  return parseResponse.success ? parseResponse.data : null;
};

let isInitialised = false;
export const useCurrentPocketBaseUser = () => {
  const usersStore = useUsersStore();
  const db = createPocketBaseDb();
  const model = ref(parsePocketBaseUserModelWithDefaults(db.authStore.model));
  if (!isInitialised) {
    if (!!db.authStore.model) {
      usersStore.start();
    }
    isInitialised = true;
  }

  db.authStore.onChange((_auth, newModel) => {
    console.log(/*LL*/ 11, 'auth Store changed!', _auth);
    model.value = parsePocketBaseUserModelWithDefaults(newModel);

    if (!!model.value) {
      usersStore.start();
    } else {
      usersStore.stop();
    }
  });

  return computed(() => ({
    model: model.value,
    isLoggedIn: !!model.value,
    login: loginWithPocketBase,
    logout: logoutWithPocketBase,
    signup: signupWithPocketBase,
    signupAndLogin: signupAndLoginWithPocketBase,
  }));
};
