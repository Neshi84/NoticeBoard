﻿using System.Collections.Generic;

namespace NoticeBoard.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public IEnumerable<UserRole> UserRole { get; set; }


    }
}
