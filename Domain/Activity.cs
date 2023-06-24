namespace Domain
{
    public class Activity
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; } // Description of the activity

        public string Category { get; set; } // Category of the activity

        public string City { get; set; } // City of the activity

        public string Venue { get; set; } // Venue of the activity

        public bool IsCancelled { get; set; } // Is the activity cancelled?

        public ICollection<ActivityAttendee> Attendees { get; set; } = new List<ActivityAttendee>(); // List of attendees

        public ICollection<Comment> Comments { get; set; } = new List<Comment>(); // List of comments
    }
}