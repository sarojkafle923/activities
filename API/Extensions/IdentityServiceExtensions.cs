using API.Services;
using Domain;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
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
                opt.Password.RequireDigit = false;
                opt.Password.RequireLowercase = false;
                opt.Password.RequireUppercase = false;
                opt.Password.RequiredUniqueChars = 0;
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

                    opt.Events = new JwtBearerEvents
                    {
                        // Add an event handler to validate the token when a message is received
                        OnMessageReceived = context =>
                        {
                            // Get the token from the request
                            var accessToken = context.Request.Query["access_token"];

                            // Get the path from the request
                            var path = context.HttpContext.Request.Path;

                            // If the path starts with /chat, set the token
                            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chat"))
                            {
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        }
                    };
                }
            );

            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsActivityHost", policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
            services.AddScoped<TokenService>();

            return services;
        }
    }
}
