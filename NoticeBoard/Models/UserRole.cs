using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoticeBoard.Models
{
    public class UserRole
    {        
        public int UserId { get; set; }
        public User User { get; set; }
        public int RolesId { get; set; }
        public Roles Roles { get; set; }
    }
}
