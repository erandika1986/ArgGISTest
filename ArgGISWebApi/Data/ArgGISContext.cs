using ArgGISWebApi.Configurations;
using ArgGISWebApi.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArgGISWebApi.Data
{
    public partial class ArgGISContext : DbContext
    {
        public ArgGISContext()
        {

        }

        public ArgGISContext(DbContextOptions<ArgGISContext> options)
                        : base(options)
        {

        }

        public virtual DbSet<SearchResult> SearchResults { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=DESKTOP-4B3H53F;Database=ArgGISDemo;Trusted_Connection=True;User Id=sa;Password=1qaz2wsx@1;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new SearchResultConfiguration());
        }
    }
}
