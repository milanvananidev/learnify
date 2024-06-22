import { apiSlice } from "../api/apiSlice";
import { userRegister } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: 'user/register',
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegister({
                            token: result?.data?.token
                        })
                    );
                } catch (error) {
                    
                }
            }
        })
    })
});

export const { useRegisterMutation } = authApi;