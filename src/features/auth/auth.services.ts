import { app } from "../../utils/firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";

export const auth = getAuth(app);

interface GoogleUserInfo extends User {
    accessToken: string
}

export const googleAuthProvider = async () => {
    const provider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, provider);
    return response.user as GoogleUserInfo;

};