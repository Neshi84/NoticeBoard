using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoticeBoard.Models
{
    public class NoticeContext:DbContext
    {
        public NoticeContext(DbContextOptions<NoticeContext> options)
           : base(options)
        {
        }

        public DbSet<Notice> Notices { get; set; }
        public DbSet<UploadedFile> UploadedFiles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<NoticeType> NoticeTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>().HasKey(i => new { i.UserId, i.RolesId });

           
        }
    }
}
