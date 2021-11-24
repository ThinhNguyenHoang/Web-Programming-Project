import request from '../../../utils/RequestHelper';


const transactionLocalBase = '/transaction';
const bankAccountLocalBase = '/bank_account';

const api_endpoints = {
    transaction: `${transactionLocalBase}`,
    bank_account: `${bankAccountLocalBase}`
}



export const makePaymentService = (payload) => {
    console.log("Making payment:", payload);
    return request.postAsync(api_endpoints.transaction, payload);
}
// Provide the user name and password
export const getTransactionListService = (payload) => {
    return request.getAsync(api_endpoints.transaction,payload);
}

export const getTransactionItemService = (payload) => {
    return request.getAsync(api_endpoints.transaction,payload);
}


// * Bank Account
export const getBankAccountListService = (payload) => {
    return request.getAsync(api_endpoints.bank_account,payload);
}
export const getBankAccountItemService = (payload) => {
    return request.getAsync(api_endpoints.bank_account,payload);
}

export const addNewBankAccountService = (payload) => {
    return request.postAsync(api_endpoints.bank_account,payload);
}
// * Mainly used for adding or removing money from the account
export const editBankAccountService = (payload) => {
    return request.putAsync(api_endpoints.bank_account, payload);
}

export const deleteBankAccountService = (payload) => {
    return request.deleteAsync(api_endpoints.bank_account, payload);
}

