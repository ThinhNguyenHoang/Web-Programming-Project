export const UpdateSubtotal=(cart)=>{
    cart.subtotal=cart.food_list.reduce((sum,food)=>{
        return sum+food.Quantity*food.Price;
    },0)+cart.combo_list.reduce((sum,combo)=> sum+combo.Quantity*combo.Price,0)
}
export const UpdateDiscount=(cart)=>{
    //TODO
    cart.discount=cart.voucher_list.filter(voucher=>voucher.id===cart.voucher_id)[0].discount;
}
export const UpdateQuantity=(cart)=>{
    cart.quantity=cart.food_list.reduce((sum,food)=>{
        return sum+food.Quantity;
    },0)+ cart.combo_list.reduce((sum,combo)=>sum+combo.Quantity,0)
}

// //convert cart data and food data to food list in cart
// export const CartData2FoodCart=(cartData,FoodData)=>{
//     console.log("convert data cart",cartData,FoodData);
//     return cartData.map((item)=>{
//         const food=FoodData.filter((e)=>e.FoodID===item.FoodID);
//         return {
//             id:food[0].FoodID,
//             name:food[0].FoodName,
//             price:food[0].Price,
//             quantity:item.Quantity,
//             img:food[0].Picture
//         }
//     })

// }
// //convert food data to food list in news
// export const FoodData2FoodList=(FoodData)=>{


// }
// //convert raw voucher data to voucher list
// export const VoucherData2VoucherList = (voucherData)=>{
//     console.log("convert data voucher",voucherData);
//     return voucherData.map((voucher)=>{
//         return {
//             id:voucher.VoucherID,
//             name:voucher.VoucherName,
//             discount:voucher.Discount,
//         }
//     })

// }
// //convert food list in cart to food data to update
// export const FoodCart2CartData=(payload)=>{
//     return payload.food_list.map((food)=>{
//         return {
//             id:food.id,
//             FoodID:food.id,
//             userID:payload.user_id,
//             Quantity:food.quantity,
//         }   
//     })
// }
