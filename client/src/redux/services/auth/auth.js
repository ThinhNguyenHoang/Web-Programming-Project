import request from "../../utils/RequestHelper";

const userLocalBase = '/user'
const api_endpoints = {
    login: `${userLocalBase}/authorize`,
    register: `${userLocalBase}/register`,
    log_out: `${userLocalBase}/logout`,
    reset_password: `${userLocalBase}/forget-password`,
    change_password: `${userLocalBase}/change-password`,
}


export const loginService = (payload) => {
    return request.postAsync(api_endpoints.login, payload);
}

export const registerService = (payload) => {
    return request.postAsync(api_endpoints.register, payload);
}

export const logoutService = (payload) => {
    return request.postAsync(api_endpoints.log_out, payload);
}

export const resetPasswordService = (payload) => {
    return request.postAsync(api_endpoints.reset_password,payload);
}

export const changePasswordService = (payload) => {
    return request.putAsync(api_endpoints.change_password, payload);
}