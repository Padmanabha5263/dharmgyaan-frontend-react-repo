import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { Sharstra } from "./shastra.type";

// function to get shastras based on religion id
export const getShastrasByReligion = async (religion_id: string) => {
   try {
     const res = await getDocs(query(collection(db, "sacred"), where("religion_id", "==", religion_id)));
     const shastras = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
     return shastras as Sharstra[];
   } catch (error) {
      throw new Error(`Failed to load Shastras: ${error instanceof Error ? error.message : String(error)}`)
   }
}