import { useCallback, useEffect, useState } from "react";
import { useLoader } from "../../utils/hooks/useLoader";
import { Religion } from "./religion.type";
import { getReligions } from "./religion.services";
import religionSlice from "./religion.slice";
import {useAppSelector} from "../../store/useAppSelector";
import {useAppDispatch} from "../../store/useAppDispatch";

interface UseReligionParams {
    initialLoad: boolean
}

export const useReligion = (params: UseReligionParams) => {
    const { initialLoad } = params;
    const loader = useLoader();
    const { setWholeReligion, setSelectedReligion, clearSelectedReligion } = religionSlice.actions
    const dispatch = useAppDispatch();
    const selectedReligion = useAppSelector((state) => state.religion.selectedReligion);
    const data = useAppSelector((state) => state.religion.wholeReligion);
    const loadData = useCallback(async () => {
        try {
            loader.turnOn();
            const res = await getReligions();
            dispatch(setWholeReligion(res));

        } catch (err) {
        } finally {
            loader.turnOff()
        }
    }, [])

    const saveSelectedReligion = useCallback((religion: Religion) => {
        dispatch(setSelectedReligion(religion));
    }, []);

    useEffect(() => {
        if (initialLoad) {
            loadData()
        }
    }, [initialLoad, loadData])


    return {
        data,
        loader,
        loadData,
        saveSelectedReligion,
        selectedReligion
    }
}