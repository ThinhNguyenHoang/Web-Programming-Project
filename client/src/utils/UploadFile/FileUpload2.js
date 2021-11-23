import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

import {useState} from "react";


import {initializeApp} from "firebase/app";
import {selectors} from "../../redux/slices/auth/AuthSlice";
import {useSelector} from "react-redux";

// Set the configuration for your
// gs://bk-food-sale.appspot.com
// TODO: Replace with your app's config object

// var admin = require("firebase-admin");
//
// var serviceAccount = require("path/to/serviceAccountKey.json");
//
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

const firebaseConfig = {

    apiKey: "AIzaSyAMeYALPFuQ_klstxu-M8WDNUmR4hoEJZM",

    authDomain: "bk-food-sale.firebaseapp.com",
    projectId: "bk-food-sale",

    storageBucket: "bk-food-sale.appspot.com",

    messagingSenderId: "1086337831090",

    appId: "1:1086337831090:web:f3ffc96eaaf043ec5279ab",

    measurementId: "G-BC8N7S3TK5"

};

const firebaseApp = initializeApp(firebaseConfig);


export const storage = getStorage(firebaseApp);

// TODO: Restyle the file uploader
const ReactFirebaseFileUpload2 = (props) => {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const userName = useSelector(selectors.getUserName)
    console.log("USER_NAME IS: ", userName);
    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    // TODO: Write code to get the user name as path file to storage
    const handleUpload = () => {

        const storageRef = ref(storage, `images/${userName ? userName : "default_user"}/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log("UNABLE TO UPLOAD FILE", error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadUrl) => {
                        props.setImageURL(downloadUrl);
                    })
            }
        )

    };

    console.log("image: ", image);

    return (
        <div>
            <progress value={progress} max="100"/>
            <br/>
            <br/>
            <input type="file" onChange={handleChange}/>
            <button onClick={handleUpload}>Upload</button>
            <br/>
            {url}
            <br/>
            <img src={url || image || "http://via.placeholder.com/300"} alt="firebase-image"/>
        </div>
    );
};

export default ReactFirebaseFileUpload2;