import { storage } from "@/services/firebase";
import { ref, uploadBytes } from "@firebase/storage";
import { getDownloadURL } from "firebase/storage";

import { v4 as uuid } from "uuid";

const getUniqueFileName = (file: File) => {
  const uniqueFileName = `${uuid()}_${file.name}`;
  return uniqueFileName;
};

export const uploadFileToStorage = async ({
  file,
  path,
  filename,
}: {
  file: File;
  path?: string;
  filename?: string;
}) => {
  filename = filename || getUniqueFileName(file);
  path = path ? `${path}/${filename}` : filename;
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
