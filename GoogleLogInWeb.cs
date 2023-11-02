using System;
using System.Net;
using System.Collections;
using UnityEngine;
using TMPro;
using System.Threading.Tasks;
using UnityEngine.Networking;
using Debug = UnityEngine.Debug;
using System.Collections.Generic;

public class GoogleLogInWeb : MonoBehaviour//firebase realtime을 이용하여 
{
    [SerializeField] private TMP_Text testText;
    private string googleStringJson;

    public void RequestAuthorizationCode()
    {
        string clientId = "1069658341853-s2r0s6f0bsj2ihfvo7097rfbi0fj2h5p.apps.googleusercontent.com";
        string redirectUri = "https://metashopgooglelogin.netlify.app/.netlify/functions/googleIdToken";//코드를 가져온 uri와 같은 uri사용해야함.
        string authorizationUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        string responseType = "code";
        string scope = "email";

        string authUrl = $"{authorizationUrl}?client_id={clientId}&redirect_uri={redirectUri}&response_type={responseType}&scope={scope}";
        Application.OpenURL(authUrl);
    }
}
