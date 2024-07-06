import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    user: "",
    role: "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload.user
            state.role = action.payload.role
        },
        userLoginState: (state, action) => {
            state.token = action.payload.accessToken
            state.user = action.payload.user
        },
        userLoggedOut: (state, action) => {
            state.token = ''
            state.user = ''
            state.user = ''
        },
    }
});

export const { userLoginState, userLoggedOut, setUserData } = authSlice.actions;
export default authSlice.reducer;
