namespace Application.Comments
{
    public class CommentDto
    {
        public int Id { get; set; } // Id of the comment

        public DateTime CreatedAt { get; set; } // Date and time the comment was created

        public string Body { get; set; } // Body of the comment

        public string Username { get; set; } // Username of the author of the comment

        public string DisplayName { get; set; } // Display name of the author of the comment

        public string Image { get; set; } // Image of the author of the comment
    }
}
