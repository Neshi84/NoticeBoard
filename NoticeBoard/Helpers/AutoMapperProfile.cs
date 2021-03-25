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

            CreateMap<Notice, NoticeDTO>()
                .ForMember(dest=>dest.FullName,opt=>opt.MapFrom(src=>src.User.FullName))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.NoticeType.Type));
        }
    }
}
