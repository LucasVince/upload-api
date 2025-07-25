import { HttpStatusCode } from "./protocols";

export const ok = (message: unknown) => {
    return {
        statusCode: HttpStatusCode.OK,
        body: message,
    };
};

export const created = (message: unknown) => {
    return {
        statusCode: HttpStatusCode.CREATED,
        body: message,
    };
};

export const badRequest = (message: unknown) => {
    return {
        statusCode: HttpStatusCode.BAD_REQUEST,
        body: message,
    };
};

export const notFound = (message: unknown) => {
    return {
        statusCode: HttpStatusCode.NOT_FOUND,
        body: message,
    };
};

export const serverError = (message: unknown) => {
    return {
        statusCode: HttpStatusCode.SERVER_ERROR,
        body: message,
    };
};
