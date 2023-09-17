import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    value: {
        isAuth: false,
        username: "",
        uid: "",
        isModerator: false,
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
            return {
                value: {
                    isAuth: true,
                    username: action.payload,
                    uid: "1234",
                    isModerator: false,
                }
            }
        }
    }
})

export const { logIn, logOut } = auth.actions;
export default auth.reducer;