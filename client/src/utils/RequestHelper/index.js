import { LogicError, RequestError } from './errorResponse';

import Cookies from 'js-cookie';
import axios from 'axios';
import constants from '../../constants';
import { handleToastOnSuccess } from './successResponse';
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

class RequestHelper {
    constructor() {
        // ! Remember to change the BASE API ROOT to PHP
        this.baseUrl = process.env.FAKE_SERVER_HOST;
        this.defaultConfig = {};
        this.defaultHeaders = {
            'Access-Control-Allow-Origin': '*',
            responseType: 'application/json'
        };
    }
    prepareHeaders(headers) {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            this.defaultHeaders.Authorization = `Bearer ${accessToken}`;
        }
        this.defaultHeaders = {
            ...this.defaultHeaders,
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Request-Id': uuidv4(),
            ...headers
        };
    }
    prepareParams(payload) {
        if (!payload) return '';
        return `?${queryString.stringify(payload)}`;
    }
    handleResponse(response, endPoint, hasToast = true) {
        if (!response || !response.data.success) {
            throw new LogicError(
                response?.data.message || 'Something went wrong. Please contact us',
                endPoint
            );
        }
        if (hasToast) {
            handleToastOnSuccess(endPoint, response);
        }
        return response.data.payload;
    }
    handleError(error) {
        throw new LogicError(
            error?.data.message || 'Something went wrong. Please contact us',
            error?.data.code || 502,
            error
        );
    }

    async getAsync(endPoint, payload, headers = {}) {
        this.prepareHeaders(headers);
        return axios
            .get(`${this.baseUrl}${endPoint}${this.prepareParams(payload)}`, {
                ...this.defaultConfig,
                headers: this.defaultHeaders
            })
            .then((response) => this.handleResponse(response, endPoint, false))
            .catch((error) => this.handleError(error.response));
    }

    async postAsync(endPoint, payload, headers = {}) {
        this.prepareHeaders(headers);
        return axios
            .post(`${this.baseUrl}${endPoint}`, payload, {
                ...this.defaultConfig,
                headers: this.defaultHeaders
            })
            .then((response) => this.handleResponse(response, endPoint))
            .catch((error) => this.handleError(error.response));
    }

    async putAsync(endPoint, payload, headers = {}) {
        this.prepareHeaders(headers);
        return axios
            .put(`${this.baseUrl}${endPoint}`, payload, {
                ...this.defaultConfig,
                headers: this.defaultHeaders
            })
            .then((response) => this.handleResponse(response, endPoint))
            .catch((error) => this.handleError(error.response));
    }

    async deleteAsync(endPoint, payload, headers = {}) {
        this.prepareHeaders(headers);
        return axios
            .delete(`${this.baseUrl}${endPoint}${this.prepareParams(payload)}`, {
                ...this.defaultConfig,
                headers: this.defaultHeaders
            })
            .then((response) => this.handleResponse(response, endPoint))
            .catch((error) => this.handleError(error.response));
    }
}

const request = new RequestHelper();

export default request;
