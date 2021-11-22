/*
    * Folder này chứa các hàm và các class xử lý thường dùng
    * Vd:
    *  + Các hàm cắt chuỗi phức tạp
    *  + Các hàm xử lý thời gian
    *  + Các hàm hỗ trợ response / request
    *  + Các hàm parse dữ liệu / chuyển đổi kiểu ,...
 */

export const array_to_chunks = (arr, size) =>Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>arr.slice(i * size, i * size + size));