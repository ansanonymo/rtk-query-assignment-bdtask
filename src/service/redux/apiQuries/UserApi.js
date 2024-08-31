import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints : (build) => ({
        // userlist 
        getUser : build.query({
            query: () => ({
                url: "users",
                method: "GET"
            }),
            providesTags: ["userlist"],
        }),

        // add user 

        addUser : build.mutation({
            query: (data) => ({
                url: "users",
                method: "POST",
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["userlist"]
        }),
        // delete user 
        deleteUser : build.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE",
                // body: JSON.stringify(data)
            }),
            invalidatesTags: ["userlist"]
        }),


        // update user 

        updateUser : build.mutation({
            query: (data) => ({
                url: `users/${data?.id}`,
                method: "PUT",
                body: JSON.stringify(data)
            }),
            invalidatesTags: ["userlist"]
        }),


        // single user 

          // userlist 
          getSingleUser : build.query({
            query: (id) => ({
                url: `users/${id}`,
                method: "GET"
            }),
            providesTags: ["userlist"],
            // keepUnusedDataFor: 0.01
        }),
    })
})

export const {useGetUserQuery, useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation, useGetSingleUserQuery, useLazyGetSingleUserQuery} = userApi