using AutoMapper;
using NoticeBoard.DTO;
using NoticeBoard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NoticeBoard.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDTO>()
                .ForMember(dest=>dest.Roles,
                            opt=>opt.MapFrom(src=>src.UserRole.Select(r=>r.Roles.Role).ToList()));
            
        }
    }
}
