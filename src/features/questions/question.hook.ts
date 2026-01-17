import { useCallback, useState } from "react"
import { GetQuestionParams, Questions } from "./questions.types"
import { useLoader } from "../../utils/hooks/useLoader"
import { getQuestions } from "./questions.services";

export const useQuestions = () => {
    const loader = useLoader();
    const [data, setData] = useState<Questions[]>([])

    const loadData = useCallback(async (params: GetQuestionParams) => {
        try {
            loader.turnOn();
            const questions = await getQuestions(params);
            setData(questions);
        } catch (err) {
        } finally {
            loader.turnOff();
        }
    }, [])

    return { data, loadData, loader }
}