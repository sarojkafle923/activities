namespace Application.Activities
{
    public class ActivityDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; } // Description of the activity

        public string Category { get; set; } // Category of the activity

        public string City { get; set; } // City of the activity

        public string Venue { get; set; } // Venue of the activity

        public string HostUsername { get; set; } // Username of the host

        public bool IsCancelled { get; set; } // Is the activity cancelled?

        public ICollection<AttendeeDto> Attendees { get; set; } // List of Atenndees
    }
}
