import {createSlice} from '@reduxjs/toolkit';
import {constants} from "../../constants";
import {generateStatus} from "../../utils/reduxGenerate";

// "foods": [
//     {
//         "FoodID": 1,
//         "FoodName": "Thịt lợn rim tiêu",
//         "Picture": "",
//         "Price": 120000,
//         "Description": "Thịt kho là món mặn dùng chính trong bữa cơm của người Việt, bên cạnh món canh và món rau. Hôm nay bếp kho quẹt sẽ giới thiệu đến các bạn món thịt kho tiêu, cũng là món được các chị em thường xuyên chế biến, nhưng để làm đúng chuẩn về màu sắc và mùi vị thì chắc hẳn nhiều người còn bỏ ngỏ. Nào, còn chờ gì nữa, chúng ta bắt tay vào làm món thịt kho tiêu cho kịp bữa cơm chiều nhé!"
//     },
//     {
//         "FoodID": 2,
//         "FoodName": "Trứng đúc thịt",
//         "Picture": "",
//         "Price": 80000,
//         "Description": "Món trứng đúc thịt là một món dễ làm, dễ ăn. Đặc biệt là trẻ em, gần như bé nào cũng thích ăn trứng nhưng đôi khi lại không thích ăn thịt vì dai. Với cách làm trứng đúc thịt này, thịt mềm và ngon, trứng rán vàng thơm lừng khắp cả nhà, hương vị rất kích thích với các bé. Hơn nữa vào những ngày bận rộn Bạn chỉ cần mất vài phút là đã có ngay một món ăn thơm ngon mà vẫn đầy đủ chất dinh dưỡng cho cả nhà rồi."
//     },
const initialState = {
    foodList: {
        data:[],
        total: 0,
        page: 0,
        size:constants.DEFAULT_PAGE_SIZE,
        status: generateStatus()
    },
    foodItemDetails:{
        data: {},
        status: generateStatus()
    }
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos.splice(index, 1);
            }
        }
    }
});

export const { addTodo, removeTodo } = todoSlice.actions;

export const selectTodo = (state) => state.todo;

export default todoSlice.reducer;