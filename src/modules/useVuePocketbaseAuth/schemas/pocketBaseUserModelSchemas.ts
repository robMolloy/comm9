import { z } from 'zod';

export const pocketBaseUserModelSchema = z.object({
  id: z.string(),
  username: z.string(),
  avatar: z.string().optional(),
  avatarUrl: z.string(),
  collectionId: z.string(),
  collectionName: z.string(),
  created: z.string(),
  email: z.string().optional(),
  updated: z.string(),
});
export const pocketBaseUsersModelSchema = z.array(pocketBaseUserModelSchema);

export const parsePocketBaseUserModelWithDefaults = (model: unknown) => {
  const parseResponse = pocketBaseUserModelSchema.safeParse(model);
  return parseResponse.success ? parseResponse.data : null;
};
export const parsePocketBaseUsersModel = (model: unknown) => {
  return pocketBaseUsersModelSchema.safeParse(model);
};
