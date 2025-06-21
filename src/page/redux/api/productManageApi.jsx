import { baseApi } from "./baseApi";

const category = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getProduct: builder.query({
      query: () => {
        return {
          url: `/product/all-products`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getProductAll: builder.query({
      query: ({page,limit}) => {
        return {
          url: `/product/all-products?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/product/create-product",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
     deleteProduct :  builder.mutation({
        query : (id)=>{
            return {
                url : `/product/delete-product/${id}`,
                method : 'DELETE'
            }
        },
        invalidatesTags :['updateProfile']
    }),


    updateProduct: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/product/update-product/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getShopProduct: builder.query({
      query: ({page,limit}) => {
        return {
          url: `/shop/get-all?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

     deleteShopProduct :  builder.mutation({
        query : (id)=>{
            return {
                url : `/shop/delete/${id}`,
                method : 'DELETE'
            }
        },
        invalidatesTags :['updateProfile']
    }),

    getSingleShopProduct: builder.query({
      query: ({ id }) => {
        return {
          url: `/shop/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["newHost"],
    }),


    addShopProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/shop/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateShopProduct: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/shop/update/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),


    // getAllProduct: builder.query({
    //   query: ({page,limit}) => {
    //     return {
    //       url: `/products?limit=${limit}&page=${page}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),

    // getSubCategory: builder.query({
    //   query: ({id}) => {
    //     return {
    //       url: `/categories/${id}`,
    //       method: "GET",
    //     };
    //   },
    //   providesTags: ["updateProfile"],
    // }),



    // deleteProduct: builder.mutation({
    //   query: (data) => ({
    //     url: `/admin/products`,
    //     method: "DELETE",
    //     body: {id:data},
    //   }),
    //   invalidatesTags: ["updateProfile"],      
    // }),




    // updateProduct: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: `/admin/products`,
    //       method: "PATCH",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["updateProfile"],
    // }),

    // addProduct: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/admin/products",
    //       method: "POST",
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["updateProfile"],
    // }),

    //  getAllNewHostUser: builder.query({
    //    query: () => {
    //      return {
    //        url: `/dashboard/get-all-add-car-req`,
    //        method: "GET",
    //      };
    //    },
    //    providesTags: ["host"],
    //  }),



    //  getSingleHostreq: builder.query({
    //    query: ({ carId }) => {
    //      return {
    //        url: `/car/get-single-car-details?carId=${carId}`,
    //        method: "GET",
    //      };
    //    },
    //    providesTags: ["newHost"],
    //  }),

    //  approveHostRequest: builder.mutation({
    //    query: ({ carId, status }) => {
    //      return {
    //        url: `/dashboard/approve-car?carId=${carId}&status=${status}`,
    //        method: "PATCH",
    //      };
    //    },
    //    invalidatesTags: ["host"],
    //  }),

    //  caneleHostRequest: builder.mutation({
    //    query: ({ carId, status }) => {
    //      return {
    //        url: `/dashboard/approve-car?carId=${carId}&status=${status}`,
    //        method: "PATCH",
    //      };
    //    },
    //    invalidatesTags: ["host"],
    //  }),

    // approveHostRequest: builder.mutation({
    //   query: ({ carId, status }) => {
    //     return {
    //       url: `/dashboard/approve-car?carId=${carId}&status=${status}`,
    //       method: "PATCH",
    //     };

    //   },
    // }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductAllQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useGetShopProductQuery,
  useGetSingleShopProductQuery,
  useAddShopProductMutation,
  useUpdateShopProductMutation,
  useDeleteShopProductMutation,
  useDeleteProductMutation,
  

} = category;
