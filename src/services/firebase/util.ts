import { FirestoreDataConverter } from "firebase/firestore";
import { z } from "zod";

/**
 * Generates a FirestoreDataConverter for a given Zod schema.
 */
export const createFirestoreDataConverter = <T extends z.ZodTypeAny>(
  schema: T
): FirestoreDataConverter<z.infer<T>> => ({
  toFirestore(data: z.infer<T>) {
    const parsedData = schema.parse(data);
    return parsedData;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return schema.parse(data);
  },
});