import { Timestamp } from "firebase/firestore"

export interface Questions {
    active: boolean,
    ans: string,
    character: string,
    createdAt: Timestamp,
    level: number,
    optA: string,
    optB: string,
    optC: string,
    optD: string,
    question: string,
    question_id: string,
    random: number,
    religion_id: string
    sacred_id: string
}