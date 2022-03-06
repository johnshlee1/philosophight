import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

export const addCollectionAndDocuments = async (collectionToAdd) => {
  try {
    await setDoc(
      doc(
        firestore,
        "philosophers",
        `${collectionToAdd.name + " " + collectionToAdd.id}`
      ),
      collectionToAdd
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
