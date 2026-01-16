import { useState } from "react"
import { auth, googleAuthProvider, googleSigninPopup } from "../auth.services";
import { errorPrint } from "../../../utils/errorPrint";


export const useGoogleAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const login = async () => {
        try {
            setIsLoading(true);
            const response = await googleSigninPopup(auth, googleAuthProvider);
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