import { useCallback, useEffect, useState } from "react";
import { useLoader } from "../../utils/hooks/useLoader";
import { Sharstra } from "./shastra.type";
import { getShastrasByReligion } from "./shastra.services";
import { useAppSelector } from "../../store/useAppSelector";
import { useAppDispatch } from "../../store/useAppDispatch";
import { shastraSlice } from "./shastra.slice";


interface UseShastraParams {
    initialLoad: boolean
    religionId?: string 
}

export const useShastra = (params: UseShastraParams) => {
    const { initialLoad, religionId } = params;
    const loader = useLoader();
    const [data, setData] = useState<Sharstra[]>([]);
    const selectedShastra = useAppSelector((state) => state.shastra.selectedShastra);
    const dispatch = useAppDispatch();
    const loadData = useCallback(async (id:string) => {
        try {
            loader.turnOn();
            const res = await getShastrasByReligion(id);
            setData(res)
        } catch (err) {
        } finally {
            loader.turnOff()
        }
    }, [])

    const saveSelectedShastra = useCallback((shastra: Sharstra) => {
        dispatch(shastraSlice.actions.setSelectedShastra(shastra));
    },[]);

    useEffect(() => {
        if (initialLoad && religionId) {
            loadData(religionId)
        }
    }, [initialLoad, loadData])


    return {
        data,
        loader,
        loadData,
        saveSelectedShastra,
        selectedShastra
    }
}