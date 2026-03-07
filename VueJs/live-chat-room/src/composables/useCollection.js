import { ref, onUnmounted } from "vue";
import { collection, addDoc as addFirestoreDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { projectFirestore } from "@/firebase";

export function useCollection(collectionName) {
    const error = ref(null);
    const documents = ref(null);

    let unsubscribe = null;

    let collectionRef = collection(projectFirestore, collectionName);

    const addDoc = async (doc) => {
        error.value = null;

        try {
            await addFirestoreDoc(collectionRef, doc);
        } catch (err) {
            console.log(err);
            console.log(err.message);
            error.value = "Could not send the message";
        }
    };

    const getCollection = () => {
        error.value = null;

        const q = query(collectionRef, orderBy("createdAt"));

        unsubscribe = onSnapshot(
            q,
            (snap) => {
                let results = [];
                console.log(snap);

                snap.docs.forEach((doc) => {
                    doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
                });

                documents.value = results;
            },
            (err) => {
                console.log(err);
                console.log(err.message);
                error.value = "Could not fetch the collection";
            }
        );
    };

    onUnmounted(() => {
        if (unsubscribe) {
            unsubscribe();
        }
    });

    return { error, addDoc, documents, getCollection };
}
