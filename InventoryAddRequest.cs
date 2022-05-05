using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class InventoryAddRequest
    {
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid number")]
        public int WorkShopId { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Please enter valid number")]
        public int Quantity { get; set; }

        [Range(0.01,100000.00, ErrorMessage = "Price must be between 0.01 and 1000000.00")]
        public decimal? BasePrice { get; set; }

       
    }
}
