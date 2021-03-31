using ChatrelDBL.BaseClassRepositories.Masters;
using ChatrelDBL.Entities;
using ChatrelPaymentWebAPI.Services;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using PayPalCheckoutSdk.Orders;
using PayPalHttp;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace ChatrelPaymentWebAPI.Controllers
{
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class PayPalCheckoutController : ControllerBase
    {
        private readonly DBConnectionInfo _info;
        private readonly AppSettings _appSettings;


        public PayPalCheckoutController(DBConnectionInfo info, IOptions<AppSettings> appSettings)
        {
            _info = info;
            _appSettings = appSettings.Value;

        }

        #region Create PayPal Order
        [AuthorizeToken]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> CreateOrder(string amount)
        {
            HttpResponse response;
            string successURL = ChatrelConfigRepository.GetValueByKey("sSuccessPayPalWebPageURL").ToString();
            string failureURL = ChatrelConfigRepository.GetValueByKey("sFailurePayPalWebPageURL").ToString();
            // Construct a request object and set desired parameters
            // Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
            var order = new OrderRequest()
            {
                CheckoutPaymentIntent = "CAPTURE",
                PurchaseUnits = new List<PurchaseUnitRequest>()
                {
                    new PurchaseUnitRequest()
                    {
                        AmountWithBreakdown = new AmountWithBreakdown()
                        {
                            CurrencyCode = "USD",
                            Value = amount
                        }
                    }
                },
                ApplicationContext = new ApplicationContext()
                {
                    ReturnUrl = successURL,
                    CancelUrl = failureURL
                }
            };


            // Call API with your client and get a response for your call
            var request = new OrdersCreateRequest();
            request.Prefer("return=representation");
            request.RequestBody(order);
            response = await PayPalClient.client().Execute(request);
            var statusCode = response.StatusCode;
            Order result = response.Result<Order>();
            Console.WriteLine("Status: {0}", result.Status);
            Console.WriteLine("Order Id: {0}", result.Id);
            Console.WriteLine("Intent: {0}", result.CheckoutPaymentIntent);
            Console.WriteLine("Links:");
            string payment_link = String.Empty;
            foreach (LinkDescription link in result.Links)
            {
                if(link.Rel == "approve")
                {
                    payment_link = link.Href;
                }
            }
            return Ok(new { order_id = result.Id, payment_link });
        }
        #endregion

        #region Capture Payment
        [AuthorizeToken]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> CaptureOrder(string orderID)
        {

            //var client = new WebClient();
            //client.Headers.Add("authorization", "Bearer A21AAJnUPMKi8CqwK3rhKqPxp2plKxFkOU37H0up15dEp5ukVAYwbTOudkqx2mtfbzjEbWNoMBUVoN595KC9kdTTER96JJDRA");
            //client.Headers.Add("content-type", "application/json");

            //try
            //{
            //    var response = client.UploadString("https://api.sandbox.paypal.com/v2/checkout/orders/64D04434899897909/capture", "POST", string.Empty);
            //    Console.WriteLine(response);

            //    // Keep the console window open in debug mode.
            //    Console.ReadKey();
            //}
            //catch (WebException e)
            //{
            //    var errorResponse = e.Response as HttpWebResponse;
            //    Console.WriteLine(e.Response.Headers);
            //    string responseText;
            //    using (var reader = new StreamReader(errorResponse.GetResponseStream()))
            //    {
            //        responseText = reader.ReadToEnd();
            //        Console.WriteLine(responseText);
            //    }
            //    // Keep the console window open in debug mode.
            //    Console.ReadKey();
            //}

            // Construct a request object and set desired parameters
            // Replace ORDER-ID with the approved order id from create order
            var request = new OrdersCaptureRequest(orderID);
            request.Prefer("return=representation");
            request.RequestBody(new OrderActionRequest());
            HttpResponse response = await PayPalClient.client().Execute(request);
            var statusCode = response.StatusCode;
            Order result = response.Result<Order>();
            Console.WriteLine("Status: {0}", result.Status);
            Console.WriteLine("Capture Id: {0}", result.Id);
            //return Ok(new { transaction_id = result.PurchaseUnits[0].Payments.Captures[0].Id, amount = result.PurchaseUnits[0].Payments.Captures[0].Amount.Value, transaction_status = result.PurchaseUnits[0].Payments.Captures[0].Status });
            
            //return Ok(new { result });

            return Ok(JsonConvert.SerializeObject(result, Formatting.Indented));
        }
        #endregion

        #region Get Order Details

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetOrderDetails(string orderId)
        {
            var client = new WebClient();
            string clientId = ChatrelConfigRepository.GetValueByKey("PayPalClientID").ToString();
            string secret = ChatrelConfigRepository.GetValueByKey("PayPalSecret").ToString();
            string auth = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{secret}"));
            client.Headers.Add("authorization", "basic " + auth);
            client.Headers.Add("content-type", "application/json");

            try
            {
                var response = client.DownloadString($"https://api.sandbox.paypal.com/v2/checkout/orders/{orderId}");
                Console.WriteLine(response);

                // Keep the console window open in debug mode.
                //Console.ReadKey();
                return Ok(new { response });
            }
            catch (WebException e)
            {
                var errorResponse = e.Response as HttpWebResponse;
                Console.WriteLine(e.Response.Headers);
                string responseText;
                using (var reader = new StreamReader(errorResponse.GetResponseStream()))
                {
                    responseText = reader.ReadToEnd();
                    Console.WriteLine(responseText);
                }
                // Keep the console window open in debug mode.
                Console.ReadKey();
                return StatusCode(500, new { responseText });
            }
            
        }
        #endregion
    }
}
