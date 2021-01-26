using System;
using System.Collections.Generic;

namespace NoticeBoard.Models
{
    public class Notice
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public IEnumerable<UploadedFile> UploadedFiles { get; set; }
        public int NoticeTypeId { get; set; }
        public NoticeType NoticeType { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

    }
}
