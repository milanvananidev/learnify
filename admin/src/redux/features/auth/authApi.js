import { apiSlice } from "../api/apiSlice";
import { userLoginState } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: 'user/login',
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    if (result?.data?.user?.role !== 'admin') {
                        return new Error('Unauthorized: User is not an admin');
                    }

                    dispatch(
                        userLoginState({
                            accessToken: result?.data?.accessToken,
                            user: result?.data?.user,
                        })
                    );
                } catch (error) {
                    
                }
            }
        })
    })
});

export const { useLoginMutation } = authApi;