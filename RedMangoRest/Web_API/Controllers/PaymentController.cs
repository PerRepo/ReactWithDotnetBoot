using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using Web_API.Data;
using Web_API.Models;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ApplicationDbContext _db;
        private ApiResponse _response;

        public PaymentController(IConfiguration config, ApplicationDbContext db)
        {
            _config = config;
            _db = db;
            _response = new ApiResponse();
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse>> MakePayment(string userId)
        {
            ShoppingCart shoppingCart = _db.ShoppingCarts.Include(u => u.CartItems)
                                        .ThenInclude(u => u.MenuItem)
                                        .FirstOrDefault(u => u.UserId == userId);

            if (shoppingCart == null || shoppingCart.CartItems == null || shoppingCart.CartItems.Count() == 0)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                return BadRequest(_response);
            }

            #region Crate Payment Intent
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
            double carttotal = shoppingCart.CartItems.Sum(u => u.MenuItem.Price * u.Quantity);
            shoppingCart.OrderTotal = carttotal;
            PaymentIntentCreateOptions options = new()
            {
                Amount = (int)(carttotal * 100),
                Currency = "thb",
                PaymentMethodTypes = new List<string>
                {
                    "card",
                },
                /*
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                },
                */
            };

            PaymentIntentService service = new();
            PaymentIntent response = service.Create(options);
            shoppingCart.StripePaymentIntentId = response.Id; // 
            shoppingCart.ClientSecret = response.ClientSecret; // This is the secret key that we need to pass to the front end

            #endregion

            _response.Result = shoppingCart;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }
    }
}