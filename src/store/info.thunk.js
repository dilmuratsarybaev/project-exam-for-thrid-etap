import { createAsyncThunk } from '@reduxjs/toolkit'
import { getProducts } from '../JS/dataService'

export const getInfoProducts = createAsyncThunk(
    'info/getInfoProducts',
    async (_, { rejectWithValue }) => {
        try {
            const data = await getProducts()
            return data
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
