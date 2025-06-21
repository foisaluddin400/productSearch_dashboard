import { baseApi } from "./baseApi";

const category = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getCount: builder.query({
            query: () => {
                return {
                    url: `/meta/get-dashboard-meta-data`,
                    method: "GET",
                };
            },
            providesTags: ["updateProfile"],
        }),

        getUser: builder.query({
            query: () => {
                return {
                    url: `/normal-user/get-all-user`,
                    method: "GET",
                };
            },
            providesTags: ["updateProfile"],
        }),

        getUserAll: builder.query({
            query: ({page,limit}) => {
                return {
                    url: `/normal-user/get-all-user?page=${page}&limit=${limit}`,
                    method: "GET",
                };
            },
            providesTags: ["updateProfile"],
        }),


        getUserGrowth: builder.query({
            query: (year) => {
                return {
                    url: `/meta/user-chart-data?year=${year}`,
                    method: "GET",
                };
            },
            providesTags: ["updateProfile"],
        }),



        getFaq: builder.query({
            query: () => {
                return {
                    url: `/manage/get-faq`,
                    method: "GET",
                };
            },
            providesTags: ["updateProfile"],
        }),

        addFaq: builder.mutation({
            query: (data) => {
                return {
                    url: "/manage/add-faq",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["updateProfile"],
        }),


        updateFaq: builder.mutation({
            query: ({ data, id }) => {
                return {
                    url: `/manage/edit-faq/${id}`,
                    method: "PATCH",
                    body: data,
                };
            },
            invalidatesTags: ["updateProfile"],
        }),


        deleteFaq: builder.mutation({
            query: (id) => {
                return {
                    url: `/manage/delete-faq/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['updateProfile']
        }),



        getTermsConditions: builder.query({
            query: () => {
                return {
                    url: "/manage/get-terms-conditions",
                    method: "GET",
                };
            },
            providesTags: ["terms"],
        }),
        postTermsCondition: builder.mutation({
            query: (data) => {
                return {
                    url: "/manage/add-terms-conditions",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["terms"],
        }),



          getPrivecy: builder.query({
            query: () => {
                return {
                    url: "/manage/get-privacy-policy",
                    method: "GET",
                };
            },
            providesTags: ["terms"],
        }),
        postPrivecy: builder.mutation({
            query: (data) => {
                return {
                    url: "/manage/add-privacy-policy",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["terms"],
        }),
    }),
});

export const {
    useGetCountQuery,
    useGetUserGrowthQuery,
    useGetUserQuery,
    useGetFaqQuery,
    useAddFaqMutation,
    useDeleteFaqMutation,
    useUpdateFaqMutation,
    usePostTermsConditionMutation,
    useGetTermsConditionsQuery,
    useGetPrivecyQuery,
    usePostPrivecyMutation,
    useGetUserAllQuery


} = category;
