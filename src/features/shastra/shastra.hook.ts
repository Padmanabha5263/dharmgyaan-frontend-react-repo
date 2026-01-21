import { useCallback, useEffect, useState } from "react";
import { useLoader } from "../../utils/hooks/useLoader";
import { Sharstra } from "./shastra.type";
import { getShastrasByReligion } from "./shastra.services";


interface UseShastraParams {
    initialLoad: boolean
    religionId: string
}

export const useShastra = (params: UseShastraParams) => {
    const { initialLoad, religionId } = params;
    const loader = useLoader();
    const [data, setData] = useState<Sharstra[]>([]);

    const loadData = useCallback(async () => {
        try {
            loader.turnOn();
            const res = await getShastrasByReligion(religionId);
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