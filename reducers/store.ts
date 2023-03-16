import { configureStore } from "@reduxjs/toolkit"
import settingReducer from './setting/index'

export const store = configureStore({
    reducer: {
        setting: settingReducer
    },
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;