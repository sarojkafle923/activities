using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; } // Id of the activity
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities
                    .Include(a => a.Attendees)
                    .ThenInclude(aa => aa.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activity is null)
                {
                    return null;
                }

                var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());

                if (user is null)
                {
                    return null;
                }

                var hostUsername = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == userAccessor.GetUsername());

                if (attendance != null && hostUsername == userAccessor.GetUsername())
                {
                    activity.IsCancelled = !activity.IsCancelled;
                }

                if (attendance != null && hostUsername != user.UserName)
                {
                    activity.Attendees.Remove(attendance);
                }

                if (attendance == null)
                {
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false,
                    };

                    activity.Attendees.Add(attendance);
                }

                var result = await context.SaveChangesAsync() > 0;

                if (result)
                {
                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}
