import { useCallback, useEffect, useState } from "react";
import { useLoader } from "../../utils/hooks/useLoader";
import { Religion } from "./religion.type";
import { getReligions } from "./religion.services";


interface UseReligionParams {
    initialLoad: boolean
}

export const useReligion = (params: UseReligionParams) => {

    const { initialLoad } = params;
    const loader = useLoader();
    const [data, setData] = useState<Religion[]>([]);

    const loadData = useCallback(async () => {
        try {
            loader.turnOn();
            const res = await getReligions();
            setData(res)
        } catch (err) {

        } finally {
            loader.turnOff()
        }


    }, [])

    useEffect(() => {
        if (initialLoad) {
            loadData()
        }
    }, [initialLoad, loadData])


    return {
        data,
        loader,
        loadData
    }


}