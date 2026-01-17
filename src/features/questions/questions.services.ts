import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { GetQuestionParams, Questions } from "./questions.types";



export const getQuestions = async (params: GetQuestionParams) => {
    const random = Math.random();
    const q = query(
        collection(db, "questions"),
        where("active", "==", true),
        where("religion_id", "==", params.religion_id),
        where("sacred_id", '==', params.sacred_id),
        where("level", '==', params.level),
        where("random", ">=", random),
        orderBy("random"),
        limit(params.limit)

    );
    const snap = await getDocs(q);
    let required_doc = snap.docs.map(d => ({ ...d.data() }));


    // Fallback if needed
    if (required_doc.length < params.limit) {
        const q2 = query(
            collection(db, "questions"),
            where("active", "==", true),
            where("religion_id", "==", params.religion_id),
            where("sacred_id", '==', params.sacred_id),
            where("level", '==', params.level),
            where("random", "<", random),
            orderBy("random"),
            limit(params.limit - required_doc.length)
        );
        const new_snap = await getDocs(q2);
        const new_doc = new_snap.docs.map(d => ({ ...d.data() }));
        required_doc = [...required_doc, ...new_doc]
    }
    return required_doc as Questions[]
}




