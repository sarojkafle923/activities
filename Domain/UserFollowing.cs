namespace Domain
{
    public class UserFollowing
    {
        // This is the join table for the many to many relationship between users
        // This is the observer (the person doing the following)
        public string ObserverId { get; set; }

        public AppUser Observer { get; set; }

        // This is the target of the observer (the person being followed)
        public string TargetId { get; set; }

        public AppUser Target { get; set; }
    }
}
