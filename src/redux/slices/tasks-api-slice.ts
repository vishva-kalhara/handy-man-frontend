import { CreateTaskFormData } from "@/forms/tasks/create-task-form";
import { Task } from "@/types/task";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApiSlice = createApi({
    reducerPath: "tasks",
    tagTypes: ["tasks"],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1",
    }),
    endpoints: (builder) => {
        return {
            getAllTasks: builder.query<Task[], string>({
                query: (query) => {
                    return {
                        url: `/tasks?isDeleted=false&taskStatus=PENDING${
                            query && `&${query}`
                        }`,
                        method: "GET",
                    };
                },
                providesTags: ["tasks"],
            }),
            createTask: builder.mutation<Task, CreateTaskFormData>({
                query: (body) => {
                    const dataInText = {
                        ...body,
                        image: undefined,
                    };

                    const formData = new FormData();
                    formData.append("image", body.image);
                    formData.append(
                        "data",
                        new Blob([JSON.stringify(dataInText)], {
                            type: "application/json",
                        })
                    );
                    return {
                        url: "/tasks",
                        method: "POST",
                        body: formData,
                        headers: {
                            Authorization: `Bearer ${
                                localStorage.getItem("token") || ""
                            }`,
                        },
                    };
                },
            }),
            getOneTask: builder.query<Task, string>({
                query: (id) => {
                    return {
                        url: `/tasks/${id}`,
                        method: "GET",
                    };
                },
            }),
            completeTask: builder.mutation<Task, string>({
                query: (id) => {
                    return {
                        url: `/tasks/${id}/complete`,
                        method: "PATCH",
                        headers: {
                            Authorization: `Bearer ${
                                localStorage.getItem("token") || ""
                            }`,
                        },
                    };
                },
                invalidatesTags: ["tasks"],
            }),
            deleteTask: builder.mutation<void, string>({
                query: (id) => {
                    return {
                        url: `/tasks/${id}`,
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${
                                localStorage.getItem("token") || ""
                            }`,
                        },
                    };
                },
                invalidatesTags: ["tasks"],
            }),
        };
    },
});

export const {
    useCreateTaskMutation,
    useGetOneTaskQuery,
    useDeleteTaskMutation,
    useGetAllTasksQuery,
    useCompleteTaskMutation,
} = taskApiSlice;
