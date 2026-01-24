import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Sharstra } from './shastra.type'

interface ShastraState {
    selectedShastra: Sharstra | null
}

const initialState: ShastraState = {
    selectedShastra: null,
}

export const shastraSlice = createSlice({
    name: 'shastra',
    initialState,
    reducers: {
        setSelectedShastra: (state, action: PayloadAction<Sharstra | null>) => {
            state.selectedShastra = action.payload
        },
        clearSelectedShastra: (state) => {
            state.selectedShastra = null
        },
    },
})
export default shastraSlice
