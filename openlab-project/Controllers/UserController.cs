using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using openlab_project.Data;
using openlab_project.Dto;
using openlab_project.Models;
using System.Security.Claims;

namespace openlab_project.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : BaseController
    {
        public UserController(ApplicationDbContext context) : base(context) { }

        [HttpGet]
        public ActionResult<UserInfo> Get()
        {
            var user = GetCurrentUser();
            var userInfo = new UserInfo();

            if (user != null)
            {
                userInfo.Xp = user.Xp;
                userInfo.Guild = user.Guild?.Name;
            }

            return userInfo;
        }
    }
}
