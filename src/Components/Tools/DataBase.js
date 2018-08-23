import firebase  from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyA0ZFxg9hneDtjyXIM8tSE6K0ZrCk1Jhn0",
    authDomain: "crowd-coddingi4.firebaseapp.com",
    databaseURL: "https://crowd-coddingi4.firebaseio.com",
    projectId: "crowd-coddingi4",
    storageBucket: "crowd-coddingi4.appspot.com",
    messagingSenderId: "611683137044"
};
const app = firebase.initializeApp(config);
const db = app.database()

var refGeneralCategory = db.ref("CategoryAndPost/Category");
var refGeneralPosts = db.ref("CategoryAndPost/Post");
var refAllUsers = db.ref("Users");
var refChatRoom = db.ref("ChatRoom")

//example user
var dbUser = db

export { refGeneralCategory, refGeneralPosts, refAllUsers, refChatRoom, dbUser}