using System;
using PayPalCheckoutSdk.Core;
using PayPalHttp;

using System.IO;
using System.Text;
using System.Runtime.Serialization.Json;
using ChatrelDBL.BaseClassRepositories.Masters;

namespace ChatrelPaymentWebAPI.Services
{
    public class PayPalClient
    {
        /**
            Set up PayPal environment with sandbox credentials.
            In production, use LiveEnvironment.
         */
        public static PayPalEnvironment environment()
        {
            string clientId = ChatrelConfigRepository.GetValueByKey("PayPalClientID").ToString();
            string secret = ChatrelConfigRepository.GetValueByKey("PayPalSecret").ToString();
            return new SandboxEnvironment(clientId, secret);
            //return new SandboxEnvironment("AdqxwGp5tKswa3OfXdw5dcCp5SQNtAEkDmPI9InDri3FcXnGCfWfpwhBsLRenYqMwrUrUTLLbnGTOM14", "ECrAFFlN_jB_Z62_rc9Ukt2Mv7Yeov2saaDbNCT3Ef_bP9JS2ke9y_G-8VGqQiTB7o3sGJRGFeBF-QKD");
        }

        /**
            Returns PayPalHttpClient instance to invoke PayPal APIs.
         */
        public static HttpClient client()
        {
            return new PayPalHttpClient(environment());
        }

        public static HttpClient client(string refreshToken)
        {
            return new PayPalHttpClient(environment(), refreshToken);
        }

        /**
            Use this method to serialize Object to a JSON string.
        */
        public static String ObjectToJSONString(Object serializableObject)
        {
            MemoryStream memoryStream = new MemoryStream();
            var writer = JsonReaderWriterFactory.CreateJsonWriter(
                        memoryStream, Encoding.UTF8, true, true, "  ");
            DataContractJsonSerializer ser = new DataContractJsonSerializer(serializableObject.GetType(), new DataContractJsonSerializerSettings { UseSimpleDictionaryFormat = true });
            ser.WriteObject(writer, serializableObject);
            memoryStream.Position = 0;
            StreamReader sr = new StreamReader(memoryStream);
            return sr.ReadToEnd();
        }
    }
}

