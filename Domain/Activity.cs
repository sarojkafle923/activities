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
    }
}