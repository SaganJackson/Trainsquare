using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Inventory
    {
        public int Id { get; set; }

        public int WorkShopId { get; set; }

        public int Quantity { get; set; }

        public decimal? BasePrice { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public int CreatedBy { get; set; }

        public int ModifiedBy { get; set; }
        public BaseUserMapper Host { get; set; }

        public string WorkShopName { get; set; }
        public string Summary { get; set; }
        public string ImageUrl { get; set; }




    }
}
