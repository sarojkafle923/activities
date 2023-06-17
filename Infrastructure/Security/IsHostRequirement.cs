using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Security.Claims;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext dbContext;
        private readonly IHttpContextAccessor httpContextAccessor;

        public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            this.dbContext = dbContext;
            this.httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
            {
                return Task.CompletedTask;
            }
            var activityId = Guid.Parse(httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var attendee = dbContext.ActivityAttendees
                .AsNoTracking()
                .SingleOrDefault(x => x.AppUserId == userId && x.ActivityId == activityId);

            if (attendee is null)
            {
                return Task.CompletedTask;
            }

            if (attendee.IsHost)
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
