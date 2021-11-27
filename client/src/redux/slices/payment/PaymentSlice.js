import { createSlice } from '@reduxjs/toolkit';
import { error, generateSagaLifecycleNames, generateStatus, loading, success } from "../../../utils/reduxGenerate";

const initialValue = {
    make_payment_status: generateStatus(),

    payment_account: {
        status:generateStatus(),
        accounts:[],
    },
    account_detail_status:generateStatus(),
    account_detail:{
        id:"",
        bank_account_number: "",
        bank_account_owner: "",
        bank_account_type: "",
        balance: "",
        valid_start:"",
        valid_end:"",
    },


    transaction:{
        status:generateStatus(),
        transactions: [],
    },
    transaction_detail_status:generateStatus(),
    transaction_detail: {
        id:"",
        time:"",
        description:"",
        amount:"",
        order_id:"",
        user_id:"",
        user_name:"",
    }
}

export const payment_selectors = {
    getBankAccountsList: (state) => state.payment.payment_account.accounts,
    getBankAccountListSuccess: (state) => state.payment.payment_account.status.isSuccess,
    getBankAccountListLoading: (state) => state.payment.payment_account.status.isLoading,
    getBankAccountListError: (state) => state.payment.payment_account.status.isError,

    getBankAccountDetail: (state) => state.payment.account_detail,
    getBankAccountDetailSuccess: (state) => state.payment.account_detail.isSuccess,
    getBankAccountDetailLoading: (state) => state.payment.account_detail.isLoading,
    getBankAccountDetailError: (state) => state.payment.account_detail.isError,

    getTransactionList: (state) => state.payment.transaction.transactions,
    getTransactionListSuccess: (state) => state.payment.transaction.status.isSuccess,
    getTransactionListLoading: (state) => state.payment.transaction.status.isLoading,
    getTransactionListError: (state) => state.payment.transaction.status.isError,

    getTransactionDetail: (state) => state.payment.transaction_detail,
    getTransactionDetailSuccess: (state) => state.payment.transaction_detail_status.isSuccess,
    getTransactionDetailLoading: (state) => state.payment.transaction_detail_status.isLoading,
    getTransactionDetailError: (state) => state.payment.transaction_detail_status.isError,
}

// * Bank Accounts
export const get_bank_accounts_actions = generateSagaLifecycleNames("get_bank_accounts");
export const get_bank_account_detail_actions = generateSagaLifecycleNames("get_bank_account_detail");
export const remove_bank_account_detail_actions = generateSagaLifecycleNames("remove_bank_account_detail");
export const edit_bank_account_detail_actions = generateSagaLifecycleNames("edit_bank_account_detail");
export const add_bank_account_detail_actions = generateSagaLifecycleNames("add_bank_account_detail");
// * Transactions
export const make_payment_actions = generateSagaLifecycleNames("make_payment");
export const get_list_transactions_actions = generateSagaLifecycleNames("get_list_transaction");
export const get_transaction_detail_actions = generateSagaLifecycleNames("get_transaction_detail");

const paymentSlice = createSlice({
    name: "payment",
    initialState: initialValue,
    reducers: {

    },
    extraReducers:{
        // * Get Bank Account List
        [get_bank_accounts_actions.loading]: (state, action) => {
            state.payment_account.status = loading();
        },
        [get_bank_accounts_actions.success]: (state, action) => {
            state.payment_account.accounts = action.payload.data;
            state.payment_account.status = success();
        },
        [get_bank_accounts_actions.error]: (state, action) => {
            state.payment_account.status = error()
        },

        // * Get Bank Account Detail
        [get_bank_account_detail_actions.loading]: (state, action) => {
            state.payment_account.status = loading();
        },
        [get_bank_account_detail_actions.success]: (state, action) => {
            state.payment_account.accounts = action.payload.data;
            state.payment_account.status = success();
        },
        [get_bank_account_detail_actions.error]: (state, action) => {
            state.payment_account.status = error()
        },

        [edit_bank_account_detail_actions.loading]: (state, action) => {
            state.payment_account.status = loading();
        },
        [edit_bank_account_detail_actions.success]: (state, action) => {
            state.payment_account.accounts = action.payload.data;
            state.payment_account.status = success();
        },
        [edit_bank_account_detail_actions.error]: (state, action) => {
            state.payment_account.status = error()
        },

        [add_bank_account_detail_actions.loading]: (state, action) => {
            state.payment_account.status = loading();
        },
        [add_bank_account_detail_actions.success]: (state, action) => {
            state.payment_account.accounts = action.payload.data;
            state.payment_account.status = success();
        },
        [add_bank_account_detail_actions.error]: (state, action) => {
            state.payment_account.status = error()
        },

        [remove_bank_account_detail_actions.loading]: (state, action) => {
            state.payment_account.status = loading();
        },
        [remove_bank_account_detail_actions.success]: (state, action) => {
            state.payment_account.accounts = action.payload.data;
            state.payment_account.status = success();
        },
        [remove_bank_account_detail_actions.error]: (state, action) => {
            state.payment_account.status = error()
        },

        [make_payment_actions.loading]: (state,action) => {
            state.make_payment_status = loading();
        },
        [make_payment_actions.success]: (state,action) => {
            // TODO: Update the account in the accounts list to new balance value
            state.make_payment_status = success();
        },
        [make_payment_actions.error]: (state,action) => {
            state.make_payment_status = error();
        },


        // * Get Transactions List
        [get_list_transactions_actions.loading]: (state, action) => {
            state.payment_account.status = loading();
        },
        [get_list_transactions_actions.success]: (state, action) => {
            state.payment_account.accounts = action.payload.data;
            state.payment_account.status = success();
        },
        [get_list_transactions_actions.error]: (state, action) => {
            state.payment_account.status = error()
        },
        // * Get Transaction detail
        [get_transaction_detail_actions.loading]: (state, action) => {
            state.payment_account.status = loading();
        },
        [get_transaction_detail_actions.success]: (state, action) => {
            state.payment_account.accounts = action.payload.data;
            state.payment_account.status = success();
        },
        [get_transaction_detail_actions.error]: (state, action) => {
            state.payment_account.status = error()
        },
    }
});


export default paymentSlice;