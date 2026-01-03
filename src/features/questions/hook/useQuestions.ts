import { useState } from "react"

export const useQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const loadQuestions = async () => {
    }
    return {
        questions,
        loadQuestions

    }
}