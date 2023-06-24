using Domain;

namespace Application.Profiles
{
    public class Profile
    {
        public string Username { get; set; } // Username of the user

        public string DisplayName { get; set; } // Display name of the user

        public string Bio { get; set; } // Bio of the user

        public string Image { get; set; } // Image of the user

        public bool Following { get; set; } // Following status of the user

        public int FollowersCount { get; set; } // Number of followers of the user

        public int FollowingCount { get; set; } // Number of users the user is following

        public ICollection<Photo> Photos { get; set; } // Photos of the user
    }
}
