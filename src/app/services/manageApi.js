import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const manageApi = createApi({
  reducerPath: "manage",
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
  tagTypes: [
    "ReportedAccounts",
    "Users",
    "ReportedPosts",
    "Posts",
    "ReportedForums",
    "Forums",
    "Products",
    "Admins",
    "Ads",
  ],
  endpoints(build) {
    return {
      getReportedAccounts: build.query({
        query() {
          return {
            url: "admin/reported-users",
            method: "GET",
          };
        },
        providesTags: ["ReportedAccounts"],
      }),

      getUsersAccounts: build.query({
        query(term) {
          return {
            url: `admin/users/${term}`,
            method: "GET",
          };
        },
        providesTags: ["Users"],
      }),

      banUser: build.mutation({
        query(body) {
          const { id, data } = body;
          return {
            url: `admin/user/${id}/ban`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["ReportedAccounts", "Users"],
      }),

      unbanUser: build.mutation({
        query(id) {
          return {
            url: `admin/user/${id}/unban`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["Users"],
      }),

      getAdminAccounts: build.query({
        query(term) {
          return {
            url: `admin/admins/${term}`,
            method: "GET",
          };
        },
        providesTags: ["Admins"],
      }),

      addAdmin: build.mutation({
        query(body) {
          return {
            url: `admin/register`,
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Admins"],
      }),
      deactivateAdmin: build.mutation({
        query(id) {
          return {
            url: `admin/${id}/deactivate`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["Admins"],
      }),
      reactivateAdmin: build.mutation({
        query(id) {
          return {
            url: `admin/${id}/reactivate`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["Admins"],
      }),
      deleteAdmin: build.mutation({
        query(id) {
          return {
            url: `admin/${id}/delete`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["Admins"],
      }),

      getReportedPosts: build.query({
        query() {
          return {
            url: "admin/reported-posts",
            method: "GET",
          };
        },
        providesTags: ["ReportedPosts"],
      }),

      getPostedPosts: build.query({
        query(term) {
          return {
            url: `admin/posts/${term}`,
            method: "GET",
          };
        },
        providesTags: ["Posts"],
      }),

      voidReportedPost: build.mutation({
        query(id) {
          return {
            url: `admin/posts/${id}/void-report`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["ReportedPosts", "Posts"],
      }),

      verifyPost: build.mutation({
        query(id) {
          return {
            url: `admin/posts/${id}/verify`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["ReportedPosts", "Posts"],
      }),

      removePost: build.mutation({
        query(body) {
          const { id, data } = body;
          return {
            url: `admin/posts/${id}/remove`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["ReportedPosts", "Posts"],
      }),

      voidReportedForum: build.mutation({
        query(id) {
          return {
            url: `admin/forums/${id}/void-report`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["ReportedForums", "Forums"],
      }),

      verifyForum: build.mutation({
        query(id) {
          return {
            url: `admin/forums/${id}/verify`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["ReportedForums", "Forums"],
      }),

      removeForum: build.mutation({
        query(body) {
          const { id, data } = body;
          return {
            url: `admin/forums/${id}/remove`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["ReportedForums", "Forums"],
      }),

      verifyProduct: build.mutation({
        query(id) {
          return {
            url: `admin/products/${id}/verify`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["Products"],
      }),

      removeProduct: build.mutation({
        query(body) {
          const { id, data } = body;
          return {
            url: `admin/products/${id}/remove`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["Products"],
      }),

      getReportedForum: build.query({
        query() {
          return {
            url: "admin/reported-forums",
            method: "GET",
          };
        },
        providesTags: ["ReportedForums"],
      }),

      getPostedForum: build.query({
        query(term) {
          return {
            url: `admin/forums/${term}`,
            method: "GET",
          };
        },
        providesTags: ["Forums"],
      }),

      getPostedProducts: build.query({
        query(term) {
          return {
            url: `admin/products/${term}`,
            method: "GET",
          };
        },
        providesTags: ["Products"],
      }),

      getAllAds: build.query({
        query(term) {
          return {
            url: `admin/ads/all`,
            method: "GET",
          };
        },
        providesTags: ["Ads"],
      }),

      addAds: build.mutation({
        query(data) {
          return {
            url: `admin/ads/store`,
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["Ads"],
      }),

      updateAds: build.mutation({
        query(body) {
          const { data, id } = body;
          return {
            url: `admin/ads/${id}/update`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["Ads"],
      }),

      deleteAds: build.mutation({
        query(id) {
          return {
            url: `admin/ads/${id}/delete`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["Ads"],
      }),
    };
  },
});

export const {
  useGetAdminAccountsQuery,
  useAddAdminMutation,
  useDeactivateAdminMutation,
  useDeleteAdminMutation,
  useReactivateAdminMutation,

  useAddAdsMutation,
  useDeleteAdsMutation,
  useUpdateAdsMutation,
  useGetAllAdsQuery,

  useGetReportedAccountsQuery,
  useGetUsersAccountsQuery,
  useBanUserMutation,
  useUnbanUserMutation,

  useGetPostedPostsQuery,
  useGetReportedPostsQuery,
  useVerifyPostMutation,
  useRemovePostMutation,
  useVoidReportedPostMutation,

  useGetPostedForumQuery,
  useGetReportedForumQuery,
  useVerifyForumMutation,
  useRemoveForumMutation,
  useVoidReportedForumMutation,

  useGetPostedProductsQuery,
  useVerifyProductMutation,
  useRemoveProductMutation,
} = manageApi;
