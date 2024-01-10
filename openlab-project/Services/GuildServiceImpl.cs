using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using openlab_project.Data;
using openlab_project.Dto;
using openlab_project.Dto.guild;
using openlab_project.Models;

namespace openlab_project.Services
{
    public class GuildServiceImpl : IGuildService
    {
        private readonly ApplicationDbContext _context;

        public GuildServiceImpl(ApplicationDbContext context) => _context = context;

        public GuildDetailsInfo? GetGuildDetail(int guildId)
        {
            IEnumerable<Guild> dbGuilds = _context.Guild;

            var dbGuild = dbGuilds.FirstOrDefault(guild => guild.Id == guildId);

            return dbGuild == null ? null : MapGuildToDto(dbGuild, GetGuildMembers(dbGuild.Id));
        }

        public IEnumerable<GuildInfo> GetGuildInfo()
        {
            IEnumerable<Guild> dbGuilds = _context.Guild;

            return dbGuilds.Select(dbGuild =>
                new GuildInfo
                {
                    Id = dbGuild.Id,
                    Name = dbGuild.Name,
                    Capacity = dbGuild.Capacity,
                    Description = dbGuild.Description,
                    MembersCount = GetGuildMembers(dbGuild.Id).Count
                });
        }

        public GuildDetailsInfo? AddCurrentUserToGuild(ApplicationUser? user, int guildId)
        {
            if (user is not { Guild: null } || user.Guild?.Id == guildId)
            {
                return null;
            }

            var guildToJoin = FindGuildWithMembers(guildId);

            if (guildToJoin == null)
            {
                return null;
            }

            guildToJoin.Members.Add(user);
            user.Guild = guildToJoin;

            _context.SaveChanges();

            return MapGuildToDto(guildToJoin, guildToJoin.Members);
        }

        public GuildDetailsInfo? RemoveCurrentUserFromGuild(ApplicationUser? user)
        {
            if (user?.Guild == null)
            {
                return null;
            }

            var guild = FindGuildWithMembers(user.Guild.Id);

            if (guild == null)
            {
                return null;
            }

            guild.Members.Remove(user);
            _context.SaveChanges();

            return MapGuildToDto(guild, guild.Members);
        }

        private static GuildDetailsInfo MapGuildToDto(Guild dbGuild, IEnumerable<ApplicationUser> guildMembers) =>
            new()
            {
                Id = dbGuild.Id,
                Name = dbGuild.Name,
                Capacity = dbGuild.Capacity,
                Description = dbGuild.Description,
                Members = MapApplicationUsersToDto(guildMembers)
            };
        public CreateGuild? CreateGuild(CreateGuild newGuild) { 
            var neviem = new Guild()
            {
                Name = newGuild.GuildName,
                Capacity = newGuild.GuildMaxCapacity,
                Description = newGuild.GuildDescription,
                
            };
            _context.Add(neviem);
            _context.SaveChanges();
            return newGuild;
        }
        public string? DeleteGuild(int guildId)
        {
            Guild guild = _context.Guild.Single(x => x.Id == guildId);
            _context.Remove(guild);
            _context.SaveChanges();
            return "guild was deleted";

        }
       /* public string DeleteEmploye(int empId)
        {
            Employe emp = db.Employes.Where(x => x.EmpID == empId).Single<Employe>();
            db.Employes.Remove(emp);
            db.SaveChanges();
            return "Record has successfully Deleted";
        }*/
        private static IEnumerable<UserInfo> MapApplicationUsersToDto(IEnumerable<ApplicationUser> users) =>
            users.Select(user => new UserInfo { Name = user.UserName, Xp = user.Xp }).ToList();


        private Guild? FindGuildWithMembers(int guildId)
        {
            return _context.Guild.Include(guild => guild.Members).FirstOrDefault(guild => guild.Id == guildId);
        }

        private ICollection<ApplicationUser> GetGuildMembers(int dbGuildId)
        {
            IEnumerable<ApplicationUser> users = _context.Users.Include(applicationUser => applicationUser.Guild);

            return users
                .Where(applicationUser => applicationUser.Guild != null && applicationUser.Guild.Id == dbGuildId)
                .ToList();
        }
    }
}