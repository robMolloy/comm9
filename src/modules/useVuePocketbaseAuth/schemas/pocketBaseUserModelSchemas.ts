import { z } from 'zod';

export const pocketBaseUserModelSchema = z
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
export const pocketBaseUsersModelSchema = z.array(pocketBaseUserModelSchema);

export const parsePocketBaseUserModelWithDefaults = (model: unknown) => {
  const parseResponse = pocketBaseUserModelSchema.safeParse(model);
  return parseResponse.success ? parseResponse.data : null;
};
export const parsePocketBaseUsersModel = (model: unknown) => {
  return pocketBaseUsersModelSchema.safeParse(model);
};
