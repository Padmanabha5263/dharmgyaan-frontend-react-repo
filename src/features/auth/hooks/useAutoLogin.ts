import { useEffect } from "react";
import { useAuthState } from "./useAuthState";

export const useAutoLogin=(fn:()=>void)=>{
    const authState=  useAuthState();
    useEffect(()=>{
        if(authState.info.isAuthenticated){

            fn();
        }
    },[authState.info.isAuthenticated])

}