import { configureStore } from '@reduxjs/toolkit'
import { infoSlice } from './info.slice'

export const store = configureStore({
    reducer: {
        [infoSlice.name]: infoSlice.reducer,
    },
})
