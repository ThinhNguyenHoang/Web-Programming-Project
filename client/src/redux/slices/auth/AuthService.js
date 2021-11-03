import request from '../../../utils/RequestHelper';


const userLocalBase = '/user'
const api_endpoints = {
    login: `${userLocalBase}/authorize`,
    register: `${userLocalBase}/register`,
    update_account: `${userLocalBase}/`,
    log_out: `${userLocalBase}/logout`,
    reset_password: `${userLocalBase}/forget-password`,
    change_password: `${userLocalBase}/change-password`,
    renew_token: `${userLocalBase}/renew-token`

}


export const loginService = (payload) => {
    console.log("Register service called with payload:", payload);
    return request.postAsync(api_endpoints.login, payload);
}

export const registerService = (payload) => {
    console.log("Register service called with payload:", payload);
    return request.postAsync(api_endpoints.register, payload);
}
// Provide the user name and password
export const updateUserAccountService = (payload) => {
    return request.putAsync(payload);
}

export const deleteUserAccountService = (payload) => {
    return request.deleteAsync(payload);
}

export const logoutService = (payload) => {
    return request.postAsync(api_endpoints.log_out, payload);
}

export const renewTokenService = (payload) => {
    return request.postAsync(api_endpoints.renew_token, payload);
}


export const resetPasswordService = (payload) => {
    return request.postAsync(api_endpoints.reset_password, payload);
}

export const changePasswordService = (payload) => {
    return request.putAsync(api_endpoints.change_password, payload);
}