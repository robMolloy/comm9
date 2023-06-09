import { z } from 'zod';

export const userSchema = z.object({
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
export const usersSchema = z.array(userSchema);

export const pocketBaseUserModelSchema = userSchema;
export const pocketBaseUsersModelSchema = userSchema;
