import { createSlice } from "@reduxjs/toolkit"
// import { createAsyncThunk } from "@reduxjs/toolkit"?

const STATUSES = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading"
})


const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        status: STATUSES.IDLE
    },
    reducers: {
        setProducts(state, action) {
            state.data = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        },


    }
})

export const { setProducts, setStatus } = productSlice.actions
export default productSlice.reducer


export function fetchProducts() {
    return async function fecthProductsThunk(dispatch, getState) {
        dispatch(setStatus(STATUSES.LOADING))
        try {
            const res = await fetch("https://api.escuelajs.co/api/v1/products")
            const data = await res.json();
            console.log(data, "data>>>>>>>>>>>");
            dispatch(setProducts(data))
            dispatch(setStatus(STATUSES.IDLE))
        } catch (error) {
            dispatch(setStatus(STATUSES.ERROR))
        }
    }
}