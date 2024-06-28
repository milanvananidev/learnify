import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    user: ""
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload.data
        },
        userRegister: (state, action) => {
            state.token = action.payload.token
        },
        userLoginState: (state, action) => {
            state.token = action.payload.accessToken
            state.user = action.payload.user
        },
        userLoggedOut: (state, action) => {
            state.token = ''
            state.user = ''
        },
    }
});

export const { userRegister, userLoginState, userLoggedOut, setUserData } = authSlice.actions;
export default authSlice.reducer;
