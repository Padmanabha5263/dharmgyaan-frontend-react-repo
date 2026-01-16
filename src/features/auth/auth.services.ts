import { app } from "../../utils/firebaseConfig";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const googleSigninPopup = signInWithPopup;