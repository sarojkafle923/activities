using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<Result<CommentDto>>
        {
            public string Body { get; set; } // Body of the comment

            public Guid ActivityId { get; set; } // Id of the activity
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                // Validation rules for the comment body
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, Result<CommentDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                this.context = context;
                this.mapper = mapper;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync(request.ActivityId);

                if (activity is null)
                {
                    return null;
                }

                var user = await context.Users
                    .Include(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());

                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body
                };

                activity.Comments.Add(comment);

                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Result<CommentDto>.Success(mapper.Map<CommentDto>(comment));
                }

                return Result<CommentDto>.Failure("Failed to add comment");
            }
        }
    }
}
