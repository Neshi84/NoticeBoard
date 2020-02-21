using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NoticeBoard.Models
{
    public class Notice
    {
        public int Id { get; set; }
        public string Content { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public string Date { get; set; }
        public string Title { get; set; }
        public IEnumerable<UploadedFile> UploadedFiles { get; set; }

    }
}
