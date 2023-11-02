import axios from 'axios';

import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithCredential } from "firebase/auth";

exports.handler = async function(event) {
  const code = event.queryStringParameters.code;//encodeURIComponent(event.queryStringParameters.code);
  // Google API와의 통신을 위해 필요한 정보
  const clientId = process.env.clientId;
  const clientSecret = process.env.clientSecret;
  const redirectUri = 'https://yoururl.netlify.app/.netlify/functions/googleIdToken';
  let response = null;

  try {
    const requestBody = `grant_type=authorization_code&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${encodeURIComponent(code)}`;
    response = await axios.post('https://www.googleapis.com/oauth2/v4/token', requestBody, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const t = response.data.id_token;

    const firebaseConfig = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: ""
    };
    
    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);
    let user = null;
    let userData = null; 
    const credential = GoogleAuthProvider.credential(t);
    const userCredential = await signInWithCredential(auth, credential);
    user = userCredential.user;
    userData = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email
    }
    return {
          statusCode: 302,//리디렉션 하기 위한 code값
          headers: {
            
            Location: `metaroom://${encodeURIComponent(JSON.stringify(userData))}`//특수문자나 공백이 들어가는 경우 변형되지 않게하기 위해 encodeURIComponent를 붙임
        }
    };
  }
  catch (error) {
    // 에러 처리
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Token retrieval failed', error: error.message, message : response.data.id_token})
    };
  }
};
