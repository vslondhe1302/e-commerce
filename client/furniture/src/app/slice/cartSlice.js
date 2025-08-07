import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import Cookies from "js-cookie"

const initialState = {
    cart : [],
    imagePath : '',
}

let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async ()=>{
        const response = await axios.post(`${apiBaseUrl}cart/view-cart`,{},{
            headers : {
                Authorization : `Bearer ${Cookies.get("TOKEN") ?? ''}`
            }
        })
        let finalData = await response.data
        return finalData
    }
)

export const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        
    },
    extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cart = action.payload.data ?? [],
      state.imagePath = action.payload.staticPath ?? ''
    })
  },
})

export const { cartData } = cartSlice.actions

export default cartSlice.reducer