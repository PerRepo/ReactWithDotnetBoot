using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Web_API.Models
{
    public class ShoppingCart
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string StripePaymentIntentId { get; set; }
        public string ClientSecret { get; set; }
        public ICollection<CartItem> CartItems { get; set; }

        [NotMapped] // This property will not be mapped to the database
        public double OrderTotal { get; set; }
    }

    public class CartItem
    {
        public int Id { get; set; }
        public int MenuItemId { get; set; }
        [ForeignKey("MenuItemId")]
        public MenuItem MenuItem { get; set; } = new();
        public int Quantity { get; set; }
        public int ShoppingCartId { get; set; }
    }
}