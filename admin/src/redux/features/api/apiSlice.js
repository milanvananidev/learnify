import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUserData } from '../auth/authSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getUserData: builder.query({
      query: () => '/user/me',
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.user?.role !== 'admin') {
            return new Error('Unauthorized: User is not an admin');
          }

          dispatch(
            setUserData({
              user: result?.data?.user,
              role: result?.data?.user?.role,
            })
          );
        } catch (error) {

        }
      }
    }),
  })
});

export const { useGetUserDataQuery } = apiSlice;
