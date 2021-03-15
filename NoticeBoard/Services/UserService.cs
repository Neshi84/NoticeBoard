using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NoticeBoard.DTO;
using NoticeBoard.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NoticeBoard.Services
{
    public class UserService : IUserService
    {
        private readonly NoticeContext _context;
        private readonly IMapper _mapper;
        public UserService(NoticeContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public UserDTO Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.Include(r => r.UserRole).ThenInclude(u => u.Roles).SingleOrDefault(x => x.UserName == username);


            if (user == null)
                return null;

            if (password != user.Password)
                return null;

            UserDTO userDto = _mapper.Map<UserDTO>(user);

            return userDto;
        }

        public User Create(User user, string password)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public bool UserExists(string userName)
        {
            var user = _context.Users.SingleOrDefault(x => x.UserName == userName);
            return user != null;
        }
        public User GetById(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(User user, string password = null)
        {
            throw new NotImplementedException();
        }
    }
}
