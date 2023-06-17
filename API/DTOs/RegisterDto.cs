using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        private const string PASSWORD_REGEX = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$";

        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression(PASSWORD_REGEX, ErrorMessage = "Password must be complex")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
    }
}
