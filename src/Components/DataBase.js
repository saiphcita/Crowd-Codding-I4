import firebase  from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCBoAOj04MWr_0EKVvIdV3l7jSK1p_3buU",
    authDomain: "crowd-coddingi3.firebaseapp.com",
    databaseURL: "https://crowd-coddingi3.firebaseio.com",
    projectId: "crowd-coddingi3",
    storageBucket: "crowd-coddingi3.appspot.com",
    messagingSenderId: "83095745342"
};
const app = firebase.initializeApp(config);
const db = app.database()

var refGeneralCategory = db.ref("CategoryAndPost/Category");
var refGeneralPosts = db.ref("CategoryAndPost/Post");
var refAllUsers = db.ref("Users");

//example user
var dbUser = db

export { refGeneralCategory, refGeneralPosts, refAllUsers, dbUser}