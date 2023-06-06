import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const landingApi = createApi({
  reducerPath: "landing",
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
  tagTypes: ["Concerns", "FAQs", "Feedbacks"],
  endpoints(build) {
    return {
      getFeedbacks: build.query({
        query() {
          return {
            url: "admin/feedbacks",
            method: "GET",
          };
        },
        providesTags: ["Feedbacks"],
      }),

      getFaqs: build.query({
        query() {
          return {
            url: "admin/faqs",
            method: "GET",
          };
        },
        providesTags: ["FAQs"],
      }),

      addFaq: build.mutation({
        query(body) {
          return {
            url: `admin/add-faq`,
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["FAQs"],
      }),

      deleteFaq: build.mutation({
        query(id) {
          return {
            url: `admin/delete-faq/${id}`,
            method: "PATCH",
          };
        },
        invalidatesTags: ["FAQs"],
      }),

      updateFaq: build.mutation({
        query(body) {
          const { id, data } = body;
          return {
            url: `admin/update-faq/${id}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["FAQs"],
      }),

      getConcerns: build.query({
        query(body) {
          return {
            url: "admin/concerns/pending",
            method: "GET",
            body,
          };
        },
        providesTags: ["Concerns"],
      }),

      getDoneConcerns: build.query({
        query(body) {
          return {
            url: "admin/concerns/done",
            method: "GET",
            body,
          };
        },
        providesTags: ["Concerns"],
      }),

      processConcern: build.mutation({
        query(id) {
          return {
            url: `admin/concern/${id}/process`,
            method: "POST",
          };
        },
        invalidatesTags: ["Concerns"],
      }),

      unprocessConcern: build.mutation({
        query(id) {
          return {
            url: `admin/concern/${id}/unprocess`,
            method: "POST",
          };
        },
        invalidatesTags: ["Concerns"],
      }),

      updateConcern: build.mutation({
        query(body) {
          const { id, data } = body;
          return {
            url: `admin/concern/${id}/update`,
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["Concerns"],
      }),
    };
  },
});

export const {
  useGetFeedbacksQuery,

  useGetFaqsQuery,
  useAddFaqMutation,
  useDeleteFaqMutation,
  useUpdateFaqMutation,

  useGetConcernsQuery,
  useGetDoneConcernsQuery,
  useUnprocessConcernMutation,
  useUpdateConcernMutation,
  useProcessConcernMutation,
} = landingApi;
