using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using openlab_project.Data;
using openlab_project.Models;
using System.Security.Claims;

namespace openlab_project.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<UserDetail> Get()
        {
            var user = GetCurrentUser();
            var userInfo = new UserDetail();

            if (user != null)
            {
                userInfo.Xp = user.Xp;
                userInfo.GuildName = user.Guild?.Name;
            }

            return userInfo;
        }

        private ApplicationUser? GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = _context.Users
                .Include(user => user.Guild)
                .SingleOrDefault(user => user.Id == userId);

            return user;
        }
    }
}
