import { z, ZodObject, ZodRawShape } from "zod";

const defaultCollectionSchema = z.object({
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createCollectionSchema = <T extends ZodRawShape>(
  schema: ZodObject<T>
) => defaultCollectionSchema.merge(schema);
