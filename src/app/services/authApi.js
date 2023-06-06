import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authentication",
  baseQuery: fetchBaseQuery({
    //baseUrl: 'http://192.168.110.150:80/api',
    baseUrl: process.env.GATSBY_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      } else {
        headers.set("Accept", `application/json`);
      }

      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints(build) {
    return {
      loginUser: build.mutation({
        query(body) {
          return {
            url: "/login/admin",
            method: "POST",
            body,
          };
        },
      }),

      logoutUser: build.mutation({
        query(body) {
          return {
            url: "/logout",
            method: "POST",
            body,
          };
        },
      }),

      verifyEmail: build.mutation({
        query(body) {
          return {
            url: `verify/email`,
            method: "POST",
            body,
          };
        },
      }),

      sendVerification: build.mutation({
        query(body) {
          return {
            url: `verify/email/send-verification-code`,
            method: "POST",
            body,
          };
        },
      }),

      forgotPass: build.mutation({
        query(body) {
          return {
            url: `forgot-password`,
            method: "POST",
            body,
          };
        },
      }),

      verifyForgotPass: build.mutation({
        query(body) {
          return {
            url: `forgot-password/verify/password-reset-request`,
            method: "POST",
            body,
          };
        },
      }),

      resetPass: build.mutation({
        query(body) {
          return {
            url: `forgot-password/reset-password`,
            method: "POST",
            body,
          };
        },
      }),
    };
  },
});

export const {
  useLoginUserMutation,
  useLogoutUserMutation,

  useForgotPassMutation,
  useVerifyForgotPassMutation,
  useResetPassMutation,

  useVerifyEmailMutation,
  useSendVerificationMutation,
} = authApi;
