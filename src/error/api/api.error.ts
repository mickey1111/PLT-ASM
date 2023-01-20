import * as httpCode from '../../constants/http-code.constant'

export default class ApiError extends Error{
    code: number;
    message: string;
    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }

    static badRequest(msg: string) {
        return new ApiError(httpCode.BAD_REQUEST, msg);
    }

    static notFound(msg: string) {
        return new ApiError(httpCode.NOT_FOUND, msg);
    }

    static internal(msg: string) {
        return new ApiError(httpCode.INTERNAL_SERVER_ERROR, msg);
    }
}