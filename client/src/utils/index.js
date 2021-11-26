/*
    * Folder này chứa các hàm và các class xử lý thường dùng
    * Vd:
    *  + Các hàm cắt chuỗi phức tạp
    *  + Các hàm xử lý thời gian
    *  + Các hàm hỗ trợ response / request
    *  + Các hàm parse dữ liệu / chuyển đổi kiểu ,...
 */

export const array_to_chunks = (arr, size) =>Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>arr.slice(i * size, i * size + size));

export const array_intersection_op= (arr1,arr2) => arr1.filter(value => arr2.includes(value));


// ? Call this function before passing time to body for backend to insert
export const getYearMonthDateFromJsDate = (value) => {
    const year = value.getFullYear();
    const month = value.getMonth();
    const date = value.getDate();
    return `${year}/${month}/${date}`;
}
