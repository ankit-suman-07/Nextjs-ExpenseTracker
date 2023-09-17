import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    value: {
        isAuth: false,
        username: "",
        
        items: [],
        amounts: [],
        category: [],
        date: [],
        total: 0,
    }
}

export const auth = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logOut: () => {
            return initialState;
        },
        logIn: (state, action) => {
            // console.log("Action : ->  ");
            // console.log(action);
            // console.log("State : ->  ");
            // console.log( state);
            return {
                value: {
                    isAuth: true,
                    username: action.payload.username,
                }
            }
        },
        addData: (state, action) => {
            console.log(action);
            return {
                value: {
                    objectData: {
                        items: action.payload.expense,
                        amounts: action.payload.cost,
                        category: action.payload.category,
                        date: action.payload.date,
                        total: action.payload.total,
                    }
                }
            }
        }
    }
})

export const { logIn, logOut, addData } = auth.actions;
export default auth.reducer;