import request from "../../../utils/RequestHelper";

const api_endpoints={
    order:"/transaction"
}

export const GetClientService= (payload)=>{
    //TODO
}

export const GetOrderService = async(payload)=>{
    return await request.getAsync(api_endpoints.order)
                        .then((res)=>res.data)
                        .catch(e=>e);
}

