import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Religion } from './religion.type'

interface ReligionState {
    wholeReligion: Religion[]
    selectedReligion: Religion | null
}

const initialState: ReligionState = {
    wholeReligion: [],
    selectedReligion: null,
}

export const religionSlice = createSlice({
    name: 'religion',
    initialState,
    reducers: {
        setWholeReligion: (state, action: PayloadAction<Religion[]>) => {
            state.wholeReligion = action.payload
        },
        setSelectedReligion: (state, action: PayloadAction<Religion | null>) => {
            state.selectedReligion = action.payload
        },
        clearSelectedReligion: (state) => {
            state.selectedReligion = null
        },
    },
})
export default religionSlice

