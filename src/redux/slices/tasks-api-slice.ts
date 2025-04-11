import { CreateTaskFormData } from "@/forms/tasks/create-task-form";
import { Task } from "@/types/task";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApiSlice = createApi({
    reducerPath: "tasks",
    tagTypes: ["tasks"],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
    endpoints: (builder) => {
        return {
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
        };
    },
});

export const { useCreateTaskMutation } = taskApiSlice;
