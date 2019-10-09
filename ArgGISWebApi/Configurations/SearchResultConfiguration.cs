using ArgGISWebApi.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArgGISWebApi.Configurations
{
    public class SearchResultConfiguration : IEntityTypeConfiguration<SearchResult>
    {
        public void Configure(EntityTypeBuilder<SearchResult> builder)
        {
            builder.ToTable("SearchResult");

            builder.HasKey(t => t.Id);

            builder.Property(e => e.Id).ValueGeneratedOnAdd();
        }
    }
}
