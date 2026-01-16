// hooks that will get the data from the firebase store 
import { useEffect, useState } from 'react';
import { collection, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';

/* Custom hook to fetch data from a Firestore collection 
   it takes actual firestore collection name as argument 
*/
export const useFetchData = (collectionPath: string) => {
  const [data, setData] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const colRef = collection(db, collectionPath);
  
  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const documents: DocumentData[] = [];
      snapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      setData(documents);
      setLoading(false);
    }, (err) => {
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [collectionPath]);
  
  return { data, loading, error };
}
