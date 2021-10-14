export class LogicError extends Error {
    constructor(message, code, error = null) {
        super();
        this.message = message;
        this.error = error;
        this.code = code;
    }
}
export class RequestError extends Error {
    constructor(error) {
        super();
        this.error = error;
    }
}

export const handleApiErrors = (error) => {
    return new LogicError(error.message, error.code, error);
};
