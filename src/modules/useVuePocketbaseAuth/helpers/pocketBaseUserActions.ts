import { createPocketBaseDb } from './createPocketBaseDb';

export const loginWithPocketBase = (p1: {
  username: string;
  password: string;
}) => {
  const db = createPocketBaseDb();
  const { username, password } = p1;

  return db.collection('users').authWithPassword(username, password);
};

export const logoutWithPocketBase = () => {
  const db = createPocketBaseDb();
  db.authStore.clear();
};

export const signupWithPocketBase = async (p1: {
  name: string;
  username: string;
  password: string;
  passwordConfirm: string;
}) => {
  const db = createPocketBaseDb();
  return db.collection('users').create({
    ...p1,
    avatarUrl: `https://avatars.dicebear.com/api/identicon/${p1.username}.svg`,
  });
};

export const signupAndLoginWithPocketBase = async (
  p1: Parameters<typeof signupWithPocketBase>[0]
) => {
  await signupWithPocketBase(p1);
  const { username, password } = p1;
  return loginWithPocketBase({ username, password });
};
