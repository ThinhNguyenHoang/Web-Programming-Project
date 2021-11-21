import {LogicError, RequestError} from './errorResponse';

import Cookies from 'js-cookie';
import axios from 'axios';
import {handleToastOnSuccess} from './successResponse';
import queryString from 'query-string';
import {v4 as uuidv4} from 'uuid';

require('dotenv').config()

console.log("MYSQL_ENV_USER:", process.env.REACT_APP_MYSQL_USER);
<<<<<<< HEAD
//const rootURL = `http://${process.env.REACT_APP_PHP_SERVER}:${process.env.REACT_APP_PHP_PORT}`;
const rootURL=`http://localhost:10001`;
=======
const rootURL = `http://${process.env.REACT_APP_PHP_SERVER}:${process.env.REACT_APP_PHP_PORT}`;
// const rootURL=`http://localhost:3001`;
>>>>>>> 55c93e77ee9123b045db8784d1c7a1721d6e0df8


function sleeper(ms) {
    return function(x) {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
}


class RequestHelper {
    constructor() {
        // ! Remember to change the BASE API ROOT to PHP
        this.baseUrl = rootURL;
        this.defaultConfig = {};
        this.defaultHeaders = {
            'Access-Control-Allow-Origin': '*',
            responseType: 'application/json'
        };
    }

    prepareHeaders(headers) {
        // const accessToken = Cookies.get('accessToken');\
        const accessToken = localStorage.getItem("token");
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

    handleResponse(response, endPoint) {
        console.log("RESPONSE IN HANDLE RESPONSE: ", response);
        const responseMessage = response.data.message.toLowerCase() || "NO MESSAGE IN Response";
        console.log("Response from server with message: ", responseMessage);
        if (!response || !responseMessage.includes("success")) {
            throw new LogicError(
                response?.data.message || 'Something went wrong. Please contact us',
                endPoint
            );
        }
        return response.data;
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
        console.log("POSTED TO:", `${this.baseUrl}${endPoint}`, payload);
        this.prepareHeaders(headers);
        return axios
            .post(`${this.baseUrl}${endPoint}`, payload, {
                ...this.defaultConfig,
                headers: this.defaultHeaders
            })
            .then((response) => this.handleResponse(response, endPoint))
            .catch((error) => this.handleError(error.response));
    }

    async postAsyncDelayed(endPoint, payload, headers = {}) {
        console.log("POSTED DELAY TO:", `${this.baseUrl}${endPoint}`, payload);
        this.prepareHeaders(headers);
        return axios
            .post(`${this.baseUrl}${endPoint}`, payload, {
                ...this.defaultConfig,
                headers: this.defaultHeaders
            })
            .then(value => new Promise(resolve => {
                setTimeout(() => {
                    resolve(value);
                }, 50000);
            }))
            .then((response) => {
                console.log("RESPONSE DELAYED NOW RESOLEVE: ", response);
                this.handleResponse(response, endPoint)
            })
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
