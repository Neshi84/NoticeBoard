using NoticeBoard.Models;
using System;
using System.Collections.Generic;

namespace NoticeBoard.DTO
{
    public class NoticeDTO
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public IEnumerable<UploadedFile> UploadedFiles { get; set; }
        public string FullName { get; set; }

        public string Type { get; set; }
    }
}