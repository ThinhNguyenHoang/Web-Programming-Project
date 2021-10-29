import { toast } from 'react-toastify';

export function generateName(actionType) {
    const actionName = actionType
        .split('_')
        .map((elem, index) => {
            elem = elem.toLowerCase();
            if (index === 0) {
                return elem;
            }
            return elem.charAt(0).toUpperCase() + elem.slice(1);
        })
        .join('');
    return actionName;
}
/*
    * This function return the names for sagas to put to the store
    * Example:
    *   Input: 'getUserProfile'
    *   Output:
    *         {
    *               success: 'getUserProfile.success'
    *               loading :'getUserProfile.loading'
    *               error: 'getUserProfile.error'
    *         }
 */
export function generateSagaLifecycleNames(actionType){
    const actionName = actionType;
    return{
        success: `${actionName}.success`,
        loading: `${actionName}.loading`,
        error: `${actionName}.error`
    }
}

export function generateStatus() {
    return {
        isSuccess: false,
        isError: false,
        isLoading: false,
        errors: {}
    };
}

export function loading() {
    return {
        isLoading: true,
        isSuccess: false,
        isError: false,
        errors: {}
    };
}

export function success(extraParams = {}) {
    return {
        isSuccess: true,
        isError: false,
        isLoading: false,
        errors: {},
        ...extraParams
    };
}

export function error(errors) {
    toast.error(errors.message);
    return {
        isSuccess: false,
        isError: true,
        isLoading: false,
        errors: errors.message
    };
}
