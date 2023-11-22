using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_API.Data;
using Web_API.Models;

namespace Web_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingCartController : ControllerBase
    {
        protected ApiResponse _response;
        private readonly ApplicationDbContext _db;
        public ShoppingCartController(ApplicationDbContext db)
        {
            _response = new ApiResponse();
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> GetShoppingCart(string userId)
        {
            try
            {
                ShoppingCart shoppingCart;
                if (string.IsNullOrEmpty(userId))
                {
                    shoppingCart = new();
                }
                else
                {
                    shoppingCart = await _db.ShoppingCarts
                                                    .Include(u => u.CartItems).ThenInclude(m => m.MenuItem)
                                                    .FirstOrDefaultAsync(u => u.UserId == userId);

                }

                if (shoppingCart.CartItems != null && shoppingCart.CartItems.Count() > 0)
                {
                    shoppingCart.OrderTotal = shoppingCart.CartItems.Sum(u => u.Quantity * u.MenuItem.Price);
                }

                _response.Result = shoppingCart;
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.ToString() };
                _response.StatusCode = HttpStatusCode.BadRequest;

            }
            return _response;
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse>> AddOrUpdateSItemInCart(string userId, int menuItemId, int updateQuantityBy)
        {
            // Shopping cart will have one entry per user id, even if a user has many items in cart.
            // Cart items will have all the items in shopping cart for a user
            // updatequantityby will have count by with an items quantity needs to be updated
            // if it is -1 that means we have lower a count if it is 5 it means we have to add 5 count to existing count.
            // if updatequantityby by is 0, item will be removed

            // when a user adds a new item to a new shopping cart for the first time
            // when a user adds a new item to an existing shopping cart (basically user has other items in cart)
            // when a user updates an existing item count
            // when a user removes an existing item

            ShoppingCart shoppingCart = _db.ShoppingCarts.Include(u => u.CartItems).FirstOrDefault(x => x.UserId == userId); // get the shopping cart for the user
            MenuItem menuItem = _db.MenuItems.FirstOrDefault(x => x.Id == menuItemId); // get the menu item

            if (menuItem == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                return BadRequest(_response);
            }

            if (shoppingCart == null && updateQuantityBy > 0)
            {
                // create a shopping cart & add the menu item to the cart
                ShoppingCart newCart = new() { UserId = userId };
                _db.ShoppingCarts.Add(newCart);
                await _db.SaveChangesAsync();

                CartItem newCartItem = new()
                {
                    MenuItemId = menuItemId,
                    Quantity = updateQuantityBy,
                    ShoppingCartId = newCart.Id,
                    MenuItem = null
                };
                _db.CartItems.Add(newCartItem);
                await _db.SaveChangesAsync();
            }
            else
            {
                // shopping cart exists
                CartItem cartItemInDb = shoppingCart.CartItems.FirstOrDefault(x => x.ShoppingCartId == shoppingCart.Id && x.MenuItemId == menuItemId);
                if (cartItemInDb == null)
                {
                    // item does not exist in current cart
                    CartItem newCartItem = new()
                    {
                        MenuItemId = menuItemId,
                        Quantity = updateQuantityBy,
                        ShoppingCartId = shoppingCart.Id,
                        MenuItem = null
                    };
                    _db.CartItems.Add(newCartItem);
                    await _db.SaveChangesAsync();
                }
                else
                {
                    //item already exists in current cart and we have to update the quantity
                    int newQuantity = cartItemInDb.Quantity + updateQuantityBy;
                    if (updateQuantityBy == 0 || newQuantity <= 0)
                    {
                        // remove item from cart and if there are no other items in cart, remove the cart
                        _db.CartItems.Remove(cartItemInDb);
                        if (shoppingCart.CartItems.Count() == 1)
                        {
                            _db.ShoppingCarts.Remove(shoppingCart);
                        }
                        await _db.SaveChangesAsync();
                    }
                    else
                    {
                        cartItemInDb.Quantity = newQuantity;
                        await _db.SaveChangesAsync();
                    }
                }
            }

            return _response;
        }
    }
}