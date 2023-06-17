using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Text;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt =>
            {
                // Remove the requirement for a non-alphanumeric character in the password
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })

            // Add the Entity Framework stores for the identity system
            .AddEntityFrameworkStores<DataContext>();

            // Add the authentication services
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        // Validate the token issuer
                        ValidateIssuerSigningKey = true,
                        // Use the same key to sign the token as the one that was used to validate the token
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                        // Validate the token issuer
                        ValidateIssuer = false,
                        // Validate the token audience
                        ValidateAudience = false
                    };
                }
            );

            services.AddScoped<TokenService>();

            return services;
        }
    }
}
