import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { Religion } from "./religion.type";


export const getReligions = async () => {
    const res = await getDocs(collection(db, "religion"));
    const religions = res.docs.map(doc => ({ ...doc.data() }));
    return religions as Religion[];
}