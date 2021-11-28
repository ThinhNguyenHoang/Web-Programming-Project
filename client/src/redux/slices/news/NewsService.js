import { async } from "@firebase/util";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { withAttributes } from "js-cookie";
import request from "../../../utils/RequestHelper";

const api_endpoints={
    news:"/news",
    comment:"/news/comment"
}

export const getNewsListService= async (payload)=>{
    console.log("get news list service");
    return await request.getAsync(api_endpoints.news)
                        .then(res=>res.data)
                        .catch(e=>e);
}
export const getNewsDetailService=async (payload)=>{
    console.log("get news detail, news id:",payload)
    return await request.getAsync(api_endpoints.news+"/"+payload)
                        .then(res=>res.data)
                        .catch(e=>e);
}
export const deleteNewsService= async(payload)=>{
    console.log("delete new service,newID:",payload);
    return await request.deleteAsync(api_endpoints.news+"/"+payload)
                        .then(res=>res.data)
                        .catch(e=>e);
}
export const addNewsService= async (payload)=>{
    console.log("add news servie,news data:",payload);
    return await request.postAsync(api_endpoints.news,payload)
                        .then(res=>res.data)
                        .catch(e=>e);
}
export const updateNewsService = async (payload)=>{
    console.log("update news service, data:",payload );
    return await request.putAsync(api_endpoints.news+"/"+payload.NewsID,payload)
                        .then(res=>res.data)
                        .catch(e=>e);
}
export const addCommentService = async(payload)=>{
    console.log("add comment service, data:",payload);
    return "";
}
export const deleteCommentService= (payload)=>{
    console.log("delete comment service,data:",payload);
    return ""
}
export const updateCommentService = (payload)=>{
    console.log("update comment service, data:",payload);
    return "";
}

const Reply1={
    ReplyID:"1",
    CommentID:"1",
    UserID:"2",
    UserName:"Username 2",
    UserAvatar:"https://glenfarrow.co.uk/wp-content/uploads/User-icon.png",
    Content:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước"
}
const Reply2={
    ReplyID:"2",
    CommentID:"1",
    UserID:"3",
    UserName:"Username 3",
    UserAvatar:"https://glenfarrow.co.uk/wp-content/uploads/User-icon.png",
    Content:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước"
}
const Reply3={
    ReplyID:"3",
    CommentID:"1",
    UserID:"4",
    UserName:"Username 4",
    UserAvatar:"https://glenfarrow.co.uk/wp-content/uploads/User-icon.png",
    Content:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước"
}

const comment1 ={
    CommentID:"1",
    UserID:"1",
    UserName:"Username 1",
    UserAvatar:"https://glenfarrow.co.uk/wp-content/uploads/User-icon.png",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam",
    ImageList:["https://glenfarrow.co.uk/wp-content/uploads/User-icon.png","https://glenfarrow.co.uk/wp-content/uploads/User-icon.png","https://glenfarrow.co.uk/wp-content/uploads/User-icon.png"], //Array url of image
    Reply:[Reply1,Reply2,Reply3]
}
const comment2 ={
    CommentID:"2",
    UserID:"2",
    UserName:"Username 2",
    UserAvatar:"https://glenfarrow.co.uk/wp-content/uploads/User-icon.png",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam",
    ImageList:["https://glenfarrow.co.uk/wp-content/uploads/User-icon.png","https://glenfarrow.co.uk/wp-content/uploads/User-icon.png","https://glenfarrow.co.uk/wp-content/uploads/User-icon.png"], //Array url of image
    Reply:[]
}
const comment3 ={
    CommentID:"3",
    UserID:"3",
    UserName:"Username 3",
    UserAvatar:"https://glenfarrow.co.uk/wp-content/uploads/User-icon.png",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam",
    ImageList:["https://glenfarrow.co.uk/wp-content/uploads/User-icon.png","https://glenfarrow.co.uk/wp-content/uploads/User-icon.png","https://glenfarrow.co.uk/wp-content/uploads/User-icon.png"], //Array url of image
    Reply:[]
}
const news1={
    NewsID:"1",
    Title:"Phó đại sứ Thụy Sĩ: Tổng thống rất mong được tiếp Chủ tịch nước",
    Picture:"https://image.shutterstock.com/image-photo/suraj-mukhi-flower-my-great-600w-1467178388.jpg",
    Highlight:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước.",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam, chỉ ít lâu sau lần gần nhất hai người gặp mặt bên lề phiên thảo luận chung cấp cao Khóa họp thứ 76 Đại hội đồng Liên Hợp Quốc vào tháng 9.Kỷ niệm 50 năm quan hệ ngoại giao là thời khắc quan trọng đối với cả hai quốc gia. Thành tựu mà Việt Nam và Thụy Sĩ đạt được trong nửa thế kỷ qua đã khẳng định sức mạnh của quan hệ đối tác này, cũng như niềm tin và cam kết với tương lai.",
    Author:"Nichole Wyrsch",
    Comment:[comment1,comment2,comment3]
}
const news2={
    NewsID:"2",
    Title:"Phó đại sứ Thụy Sĩ: Tổng thống rất mong được tiếp Chủ tịch nước",
    Picture:"https://image.shutterstock.com/image-photo/suraj-mukhi-flower-my-great-600w-1467178388.jpg",
    Highlight:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước.",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam, chỉ ít lâu sau lần gần nhất hai người gặp mặt bên lề phiên thảo luận chung cấp cao Khóa họp thứ 76 Đại hội đồng Liên Hợp Quốc vào tháng 9.Kỷ niệm 50 năm quan hệ ngoại giao là thời khắc quan trọng đối với cả hai quốc gia. Thành tựu mà Việt Nam và Thụy Sĩ đạt được trong nửa thế kỷ qua đã khẳng định sức mạnh của quan hệ đối tác này, cũng như niềm tin và cam kết với tương lai.",
    Author:"Nichole Wyrsch",
    Comment:[]
}
const news3={
    NewsID:"3",
    Title:"Phó đại sứ Thụy Sĩ: Tổng thống rất mong được tiếp Chủ tịch nước",
    Picture:"https://image.shutterstock.com/image-photo/suraj-mukhi-flower-my-great-600w-1467178388.jpg",
    Highlight:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước.",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam, chỉ ít lâu sau lần gần nhất hai người gặp mặt bên lề phiên thảo luận chung cấp cao Khóa họp thứ 76 Đại hội đồng Liên Hợp Quốc vào tháng 9.Kỷ niệm 50 năm quan hệ ngoại giao là thời khắc quan trọng đối với cả hai quốc gia. Thành tựu mà Việt Nam và Thụy Sĩ đạt được trong nửa thế kỷ qua đã khẳng định sức mạnh của quan hệ đối tác này, cũng như niềm tin và cam kết với tương lai.",
    Author:"Nichole Wyrsch",
    Comment:[]
}
const news4={
    NewsID:"4",
    Title:"Phó đại sứ Thụy Sĩ: Tổng thống rất mong được tiếp Chủ tịch nước",
    Picture:"https://image.shutterstock.com/image-photo/suraj-mukhi-flower-my-great-600w-1467178388.jpg",
    Highlight:"Phó đại sứ Thụy Sĩ Nichole Wyrsch cho biết Tổng thống Guy Parmelin rất mong được đón tiếp Chủ tịch nước Nguyễn Xuân Phúc đến thăm nhân kỷ niệm 50 năm quan hệ ngoại giao hai nước.",
    Content:"Tổng thống Thụy Sĩ Guy Parmelin rất mong đợi được đón tiếp người đồng cấp Việt Nam, chỉ ít lâu sau lần gần nhất hai người gặp mặt bên lề phiên thảo luận chung cấp cao Khóa họp thứ 76 Đại hội đồng Liên Hợp Quốc vào tháng 9.Kỷ niệm 50 năm quan hệ ngoại giao là thời khắc quan trọng đối với cả hai quốc gia. Thành tựu mà Việt Nam và Thụy Sĩ đạt được trong nửa thế kỷ qua đã khẳng định sức mạnh của quan hệ đối tác này, cũng như niềm tin và cam kết với tương lai.",
    Author:"Nichole Wyrsch",
    Comment:[]
}


// const response={
//     FoodList:[],
//     ComBoList:[]
// }
// const food={
//     FoodID:"",
//     FoodName:"",
//     Picture:"",
//     Price:0,
//     Quantity:0,
// }
// const Combo={
//     ComboID:"",
//     ComboName:"",
//     Picture:"",
//     Quantity:0,
//     Price:0,
//     FoodList:[] 
// }
const news_list=[news1,news2,news3,news4];