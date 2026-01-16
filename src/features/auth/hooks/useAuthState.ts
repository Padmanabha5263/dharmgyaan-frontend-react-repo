import { useAppDispatch } from "../../../store/useAppDispatch";
import { useAppSelector } from "../../../store/useAppSelector";
import authSlice from "../auth.slice"
import { AuthUser } from "../auth.types";


export const useAuthState = () => {
    const { updateUserInfo } = authSlice.actions;
    const dispatch = useAppDispatch();
    const info = useAppSelector(state => state.auth);


    const updateUserDetails = (details: AuthUser) => {
        dispatch(updateUserInfo(details))
    }

    return {
        info,
        updateUserDetails
    }
}