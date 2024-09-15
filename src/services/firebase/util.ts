import {
  FirestoreDataConverter,
  serverTimestamp,
  Transaction,
} from "firebase/firestore";
import { z, ZodObject, ZodRawShape } from "zod";

import { runTransaction as firestoreRunTransaction } from "firebase/firestore";
import { db } from ".";

/**
 * Generates a FirestoreDataConverter for a given Zod schema.
 * All data gets parsed with the schema and the createdAt and * * * updatedAt fields are added.
 */
export const createFirestoreDataConverter = <T extends ZodRawShape>(
  schema: ZodObject<T>
): FirestoreDataConverter<z.infer<ZodObject<T>>> => ({
  toFirestore(data: z.infer<ZodObject<T>>) {
    const parsedData = schema.parse(data);
    const timestamp = serverTimestamp();
    return {
      ...parsedData,
      createdAt: data.createdAt || timestamp,
      updatedAt: timestamp,
    };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    data.createdAt = data.createdAt.toDate();
    data.updatedAt = data.updatedAt.toDate();
    return schema.parse({
      ...data,
      id: snapshot.id,
      ...(data.createdAt ? {} : { createdAt: data.createdAt.toDate() }),
      ...(data.updatedAt ? {} : { updatedAt: data.updatedAt.toDate() }),
    });
  },
});

export const runTransaction = (
  cb: (transaction: Transaction) => Promise<unknown>
) => firestoreRunTransaction(db, cb);
