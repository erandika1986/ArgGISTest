using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArgGISWebApi.Model
{
    public class SearchResult
    {
        public int Id { get; set; }
        public string SearchValue { get; set; }
        public string WebLink { get; set; }
        public string ImageURL { get; set; }
    }
}
