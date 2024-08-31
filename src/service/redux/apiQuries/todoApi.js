import { baseApi } from "./baseApi";

export const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAllTodo: builder.query({
        query: () => ({
          url: "todos",
          method: "GET",
        }),
        providesTags: ["todos"],
      }),

      addTodo: builder.mutation({
        query: (todoData) => ({
          url: "todos",
          method: "POST",
          body: JSON.stringify(todoData),
        }),
        invalidatesTags: ["todos"],
      }),

      deleteTodo: builder.mutation({
        query: (id) => ({
          url: "todos/" + id,
          method: "DELETE",
        }),
        invalidatesTags: ["todos"],
      }),

      completeTodo: builder.mutation({
        query: (id) => ({
          url: "todos/" + id,
          method: "PATCH",
          body: JSON.stringify({
            isComplete: true,
          }),
        }),
        invalidatesTags: ["todos"],
      }),

      updateTodo: builder.mutation({
        query: (data) => ({
          url: "todos/" + data.id,
          method: "PUT",
          body: JSON.stringify(data.body),
        }),
        invalidatesTags: ["todos"],
      }),
    };
  },
});

export const {
  useGetAllTodoQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useCompleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
