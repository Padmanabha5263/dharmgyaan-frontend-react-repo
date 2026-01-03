import { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth'
import { auth } from '../../../shared/config/firebase';
// import styled from 'styled-components';

import { Card, styled } from '@mui/material';


const Container = styled('div')(({ theme, }) => ({
  display: 'flex',
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: 'red',
}));




function SignInPage() {
  const [userInfo, setUserInfo] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false);

  // function to signin the user with google social login
  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUserInfo(result.user);
      setIsLoading(false)
    }

    catch (error: any) { // Use 'any' for error type or more specific FirebaseError
      if (error.code === 'auth/cancelled-popup-request') {
        console.warn("Google sign-in popup was cancelled or blocked by the browser.");
        // Optionally, inform the user or try an alternative method like signInWithRedirect
      }
      else if (error.code === 'auth/popup-blocked') {
        console.warn("Google sign-in popup was blocked by the browser. Please allow popups for this site.");
      }
      else {
        console.error("Error with Google sign-in:", error.message);
      }
      throw error; // Re-throw the error if you want calling code to handle it
    }
  }

  // function to signout the google social loggedin user
  const googleAuthSignout = async () => {
    try {
      const signoutRes = await signOut(auth)
      console.log("siginout result", signoutRes)
      setUserInfo(null)
    }
    catch (error) {
      console.log("signout error", error)
    }
  }
  // function to signin the user with facebook social login
  // const signInWithFacebook = async()=>{
  //   try {
  //     const provider = new FacebookAuthProvider();
  //     const result = await signInWithPopup(auth, provider);
  //     console.log("result", result);
  //      setUserInfo(result);
  //   } 
  //   catch (error) {
  //     console.log("error",error)
  //   }
  // }

  // rendering the ui
  return (
    <Container>
      <Card>
        <Title>Welcome to DharmGyaan</Title>
        <Subtitle>Sign in to continue</Subtitle>
        <GoogleButton onClick={signInWithGoogle} disabled={isLoading}>
          <GoogleIcon viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </GoogleIcon>
          {isLoading ? 'Signing in...' : 'Continue with Google'}
        </GoogleButton>

        {userInfo && (
          <div>
            <Subtitle>Logged in User <br /><strong>{userInfo.user.email}</strong></Subtitle>
            <GoogleButton onClick={googleAuthSignout}>
              Signout
            </GoogleButton>
          </div>
        )}
      </Card>
    </Container>
  )
}


// const Card = styled.div`
//   background: white;
//   border-radius: 16px;
//   padding: 40px;
//   box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
//   width: 100%;
//   max-width: 400px;
//   text-align: center;
// `;

// const Title = styled.h1`
//   font-size: 28px;
//   font-weight: 600;
//   margin: 0 0 8px 0;
//   color: #1a1a1a;
// `;

// const Subtitle = styled.p`
//   font-size: 16px;
//   color: #666;
//   margin: 0 0 32px 0;
// `;

// const GoogleButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 12px;
//   width: 100%;
//   padding: 14px 24px;
//   border: 2px solid #e0e0e0;
//   border-radius: 8px;
//   background: white;
//   color: #3c4043;
//   font-size: 16px;
//   font-weight: 500;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover:not(:disabled) {
//     border-color: #4285f4;
//     box-shadow: 0 2px 8px rgba(66, 133, 244, 0.2);
//   }

//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
// `;

// const GoogleIcon = styled.svg`
//   width: 20px;
//   height: 20px;
// `;

export default SignInPage
