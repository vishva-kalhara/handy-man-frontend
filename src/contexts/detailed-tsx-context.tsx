import { Task } from "@/types/task";
import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";
import {
    QueryActionCreatorResult,
    QueryDefinition,
} from "@reduxjs/toolkit/query";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

type Props = {
    task: Task;
    polling: {
        isPolling: boolean;
        setIsPolling: Dispatch<SetStateAction<boolean>>;
    };
    refetch: () => QueryActionCreatorResult<
        QueryDefinition<
            string,
            BaseQueryFn<
                string | FetchArgs,
                unknown,
                FetchBaseQueryError,
                object,
                FetchBaseQueryMeta
            >,
            "tasks",
            Task,
            "tasks"
        >
    >;
};

export const DetailedTaskContext = createContext<Props | undefined>(undefined);

export function useTask() {
    const props = useContext(DetailedTaskContext);

    if (props === undefined) {
        throw new Error(
            "useTask must be used within a DetailedTaskContext.Provider"
        );
    }

    return {
        task: props.task,
        refetch: props.refetch,
        setIsPolling: props.polling.setIsPolling,
        isPolling: props.polling.isPolling,
    };
}
