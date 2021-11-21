// // import firebase from "firebase/app";
// // import "firebase/storage";
// //
// // const firebaseConfig = {
// //     apiKey: "AIzaSyAMeYALPFuQ_klstxu-M8WDNUmR4hoEJZM",
// //     authDomain: "bk-food-sale.firebaseapp.com",
// //     projectId: "bk-food-sale",
// //     storageBucket: "bk-food-sale.appspot.com",
// //     messagingSenderId: "1086337831090",
// //     appId: "1:1086337831090:web:f3ffc96eaaf043ec5279ab",
// //     measurementId: "G-BC8N7S3TK5"
// // };
// //
// // firebase.initializeApp(firebaseConfig);
// //
// // const storage = firebase.storage();
// //
// //
// // export { storage, firebase as default };
//
//
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
//
// // Set the configuration for your app
// // TODO: Replace with your app's config object
// const firebaseConfig = {
//     apiKey: "AIzaSyAMeYALPFuQ_klstxu-M8WDNUmR4hoEJZM",
//     authDomain: "bk-food-sale.firebaseapp.com",
//     projectId: "bk-food-sale",
//     storageBucket: "bk-food-sale.appspot.com",
//     messagingSenderId: "1086337831090",
//     appId: "1:1086337831090:web:f3ffc96eaaf043ec5279ab",
//     measurementId: "G-BC8N7S3TK5"
// };
// const firebaseApp = initializeApp(firebaseConfig);
//
// // Get a reference to the storage service, which is used to create references in your storage bucket
// export const storage = getStorage(firebaseApp);