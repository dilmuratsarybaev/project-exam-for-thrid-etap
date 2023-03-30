import { createSlice } from '@reduxjs/toolkit'
import { getInfoProducts } from './info.thunk'

const initialState = {
    items: [],
    totalPrices: 0,
    discount: 0,
    isLoading: true,
    error: '',
}

export const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        increament(state, action) {
            state.items.map((item) => {
                if (item.id === action.payload.id) {
                    item.total = item.price * action.payload.amount
                    item.orderedQuantity = action.payload.amount
                }
            })
        },
        decreament(state, action) {
            state.items.map((item) => {
                if (item.id === action.payload.id) {
                    item.total = item.price * action.payload.amount
                    item.orderedQuantity = action.payload.amount
                }
            })
        },
        calculateTotals(state) {
            const sum = state.items.reduce((sum, product) => {
                return sum + product.total
            }, 0)

            if (sum > 1000) {
                state.discount = (sum * 10) / 100
                state.totalPrices = sum - state.discount
            } else {
                state.totalPrices = sum
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getInfoProducts.fulfilled, (state, action) => {
            const newItems = action.payload.products.map((item) => ({
                ...item,
                orderedQuantity: 0,
                total: 0,
            }))
            state.items = newItems
            state.isLoading = false
        })
        builder.addCase(getInfoProducts.rejected, (state, action) => {
            state.error = action.payload
        })
    },
})

export const infoAction = infoSlice.actions
