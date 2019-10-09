using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ArgGISWebApi.Data;
using ArgGISWebApi.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ArgGISWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private ArgGISContext db;

        public SearchController(ArgGISContext db)
        {
            this.db = db;
        }


        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<SearchResult>> Get()
        {
            return db.SearchResults.ToList();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<SearchResult> Get(int id)
        {
            return db.SearchResults.FirstOrDefault(t=>t.Id==id);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] SearchResult value)
        {
            if(value.Id==0)
            {
                db.SearchResults.Add(value);
                db.SaveChanges();
            }
        }
    }
}