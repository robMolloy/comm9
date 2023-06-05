import { z } from 'zod';

export const messageSchema = z.object({
  id: z.string(),
  text: z.string(),
  senderId: z.string(),
  recipientId: z.string(),
  created: z.string(),
  updated: z.string(),
});
export const messagesSchema = z.array(messageSchema);
