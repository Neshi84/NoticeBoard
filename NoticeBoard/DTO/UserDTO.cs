using System.Collections.Generic;

namespace NoticeBoard.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string FullName { get; set; }     
        public string UserName { get; set; }
        public IEnumerable<string> Roles { get; set; }

        
    }
}