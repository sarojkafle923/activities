using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // This is the mapping profile for the Activity class
            CreateMap<Activity, Activity>();
        }
    }
}
