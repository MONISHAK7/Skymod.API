using Microsoft.EntityFrameworkCore;
using Skymod.API.Models;

namespace Skymod.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Property> Properties => Set<Property>();
    public DbSet<AppUser> AppUsers => Set<AppUser>();
}

