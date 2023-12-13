using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using openlab_project.Data;
using openlab_project.Models;
using System.Security.Claims;

namespace openlab_project.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected readonly ApplicationDbContext Context;

        public BaseController(ApplicationDbContext context) => Context = context;

        protected ApplicationUser? GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = Context.Users
                .Include(user => user.Guild)
                .SingleOrDefault(user => user.Id == userId);

            return user;
        }
    }
}
