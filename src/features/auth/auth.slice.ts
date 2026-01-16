import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AuthUser } from './auth.types'

const initialState: AuthUser = {
    uid: '',
    email: '',
    name: '',
    accessToken: '',
    refreshToken: '',
    providerId: '',
    phoneNumber: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUserInfo: (state, action: PayloadAction<AuthUser>) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.photo = action.payload.photo;
            state.uid = action.payload.uid;
        },
    },
})
export default authSlice