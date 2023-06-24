using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; } // Activities table in the database

        public DbSet<ActivityAttendee> ActivityAttendees { get; set; } // ActivityAttendees table in the database

        public DbSet<Photo> Photos { get; set; } // Photos table in the database

        public DbSet<Comment> Comments { get; set; } // Comments table in the database

        public DbSet<UserFollowing> UserFollowings { get; set; } // Followings table in the database

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new { aa.AppUserId, aa.ActivityId })); // Composite key

            builder.Entity<ActivityAttendee>().HasOne(u => u.AppUser).WithMany(a => a.Activities)
                .HasForeignKey(aa => aa.AppUserId); // One to many relationship

            builder.Entity<ActivityAttendee>().HasOne(u => u.Activity).WithMany(a => a.Attendees)
                .HasForeignKey(aa => aa.ActivityId); // One to many relationship

            builder.Entity<Comment>().HasOne(a => a.Activity).WithMany(c => c.Comments).OnDelete(DeleteBehavior.Cascade); // One to many relationship

            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId }); // Composite key

                b.HasOne(o => o.Observer).WithMany(f => f.Followings).HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.Cascade); // One to many relationship

                b.HasOne(o => o.Target).WithMany(f => f.Followers).HasForeignKey(o => o.TargetId)
                     .OnDelete(DeleteBehavior.Cascade); // One to many relationship
            });
        }
    }
}
