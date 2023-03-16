import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SettingState {
    $isDarkMode: boolean
}

const initialState: SettingState = {
    $isDarkMode: false,
}

const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        toggleDarkMode:(state) => {
            state.$isDarkMode = !state.$isDarkMode
        }
    }
})

export const { toggleDarkMode } = settingSlice.actions;
export default settingSlice.reducer;