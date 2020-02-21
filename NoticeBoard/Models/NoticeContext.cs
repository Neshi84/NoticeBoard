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
    }
}
