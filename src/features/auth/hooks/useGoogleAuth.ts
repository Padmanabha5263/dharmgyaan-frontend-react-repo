import { useState } from "react"
import { auth, googleAuthProvider, googleSigninPopup } from "../auth.services";
import { errorPrint } from "../../../utils/errorPrint";
import { useAuthState } from "./useAuthState";
import { User } from "firebase/auth";

interface UserInfo extends User {
    accessToken: string
}


export const useGoogleAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const authState = useAuthState();
    const login = async () => {
        try {
            setIsLoading(true);
            const response = await googleSigninPopup(auth, googleAuthProvider);
            const userInfo = response.user as UserInfo;
            authState.updateUserDetails({
                uid: userInfo.uid,
                email: userInfo.email ?? '',
                name: userInfo.displayName ?? '',
                phoneNumber: userInfo.phoneNumber,
                accessToken: userInfo.accessToken,
                refreshToken: userInfo.refreshToken,
                providerId: userInfo.providerId,
                isAuthenticated:true,
            });
        } catch (err) {
            const details = errorPrint(err, 'useGoogleAuth');

            setErrorMsg(details.message)
            throw err;
        } finally {
            setIsLoading(false);
        }
    }
    return {
        isLoading,
        errorMsg,
        login
    }

}