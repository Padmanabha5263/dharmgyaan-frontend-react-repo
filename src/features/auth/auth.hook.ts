import { useState } from "react";
import { useAppDispatch } from "../../store/useAppDispatch";
import { useAppSelector } from "../../store/useAppSelector";
import { Provider } from "./auth.enum";
import { googleAuthProvider } from "./auth.services";
import authSlice from "./auth.slice";
import { AuthUser } from "./auth.types";
import { errorPrint } from "../../utils/errorPrint";

export interface UseAuthReturn {
    info: AuthUser,
    login: (provider: Provider) => Promise<void>,
    isLoading: boolean;
    errMsg: string
}

export const useAuth = (): UseAuthReturn => {
    const { updateUserInfo } = authSlice.actions;
    const dispatch = useAppDispatch();
    const info = useAppSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const login = async (provider: Provider) => {
        try {
            setIsLoading(true);
            if (provider === Provider.GOOGLE) {
                //try to google login
                const userInfo = await googleAuthProvider();
                dispatch(updateUserInfo(
                    {
                        uid: userInfo.uid,
                        email: userInfo.email ?? '',
                        name: userInfo.displayName ?? '',
                        phoneNumber: userInfo.phoneNumber,
                        accessToken: userInfo.accessToken,
                        refreshToken: userInfo.refreshToken,
                        providerId: userInfo.providerId,
                        isAuthenticated: true,
                    }
                ))
            }
        } catch (err) {
            const details = errorPrint(err, `useAuth :: Provider :: ${provider}`);
            setErrMsg(details.message)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        info,
        login,
        isLoading,
        errMsg
    }
}