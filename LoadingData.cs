using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using TMPro;

public class LoadingData : MonoBehaviour
{
    public TMP_Text dataText;

    void Start()
    {
        string[] args = System.Environment.GetCommandLineArgs();
        string param1 = args.FirstOrDefault(arg => arg.StartsWith("/param1:"))?.Substring("/param1:".Length);
        dataText.text = param1;
    }
}
