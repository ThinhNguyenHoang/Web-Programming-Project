import request from '../../../utils/RequestHelper';


const companyBase = '/page_setting';

const api_endpoints = {
    settings: `${companyBase}`,
}



export const updatePageSettingService = (payload) => {
    return request.putAsync(api_endpoints.settings, payload);
}
// Provide the user name and password
export const getPageSettingService = (payload) => {
    return request.getAsync(api_endpoints.settings);
}

