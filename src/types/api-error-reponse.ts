export type FieldError = {
    field: string;
    message: string;
};

export type ApiErrorResponse = {
    status: number;
    data: {
        status: number;
        message: string;
        errors?: FieldError[];
    };
};
