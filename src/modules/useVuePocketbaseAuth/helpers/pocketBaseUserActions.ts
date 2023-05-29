import { createPocketBaseDb } from './createPocketBaseDb';

export const loginWithPocketBase = async (p1: {
  username: string;
  password: string;
}) => {
  const db = createPocketBaseDb();
  const { username, password } = p1;

  try {
    const response = await db
      .collection('users')
      .authWithPassword(username, password);
    return { success: true, data: response } as const;
  } catch (e) {
    const error = e as {
      data: { message: string; data: Record<string, never> };
    };
    return { success: false, error: error.data } as const;
  }
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
  const avatarUrl = `https://avatars.dicebear.com/api/identicon/${p1.username}.svg`;
  try {
    const response = await db.collection('users').create({ ...p1, avatarUrl });
    return { success: true, data: response } as const;
  } catch (e) {
    const error = e as {
      data: { message: string; data: { [key: string]: { message: string } } };
    };
    return { success: false, error: error.data } as const;
  }
};

export const signupAndLoginWithPocketBase = async (
  p1: Parameters<typeof signupWithPocketBase>[0]
) => {
  const signupResponse = await signupWithPocketBase(p1);
  console.log(/*LL*/ 11, 'signupResponse', signupResponse);
  if (!signupResponse.success) return signupResponse;

  const { username, password } = p1;
  return loginWithPocketBase({ username, password });
};
