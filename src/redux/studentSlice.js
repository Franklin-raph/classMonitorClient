import { createSlice } from '@reduxjs/toolkit'

const signedInStudent = localStorage.getItem('studentDetails')

export const studentSlice = createSlice({
    name:"student",
    initialState: { value: JSON.parse(signedInStudent) },
    reducers:{
        signUp:(state, action) => {
            state.value = action.payload;
        },
        signIn:(state, action) => {
            state.value = action.payload;
        }
    }
})

export const { signUp, signIn } = studentSlice.actions;
export default studentSlice.reducer


// 19284781