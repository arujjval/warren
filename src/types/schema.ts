import { z } from 'zod';

// Example of a simple user schema
export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().int().min(0).optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  tags: z.array(z.string()).default([]),
});

// Example of a nested schema
export const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
  zipCode: z.string(),
});

export const UserWithAddressSchema = UserSchema.extend({
  address: AddressSchema.optional(),
});

// Example of an enum schema
export const UserRoleSchema = z.enum(['ADMIN', 'USER', 'GUEST']);

// Example of a discriminated union
export const MessageSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('text'),
    content: z.string(),
  }),
  z.object({
    type: z.literal('image'),
    url: z.string().url(),
    caption: z.string().optional(),
  }),
]);

// Type inference
export type User = z.infer<typeof UserSchema>;
export type Address = z.infer<typeof AddressSchema>;
export type UserWithAddress = z.infer<typeof UserWithAddressSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export type Message = z.infer<typeof MessageSchema>; 