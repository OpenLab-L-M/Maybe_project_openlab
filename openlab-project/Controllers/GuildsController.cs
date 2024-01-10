﻿using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using openlab_project.Data;
using openlab_project.Dto.guild;
using openlab_project.Models;
using openlab_project.Services;

namespace openlab_project.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GuildsController : BaseController
    {
        private readonly IGuildService _guildService;

        public GuildsController(IGuildService guildService, ApplicationDbContext context) : base(context) =>
            _guildService = guildService;

        [HttpGet]
        public IEnumerable<GuildInfo> Get() => _guildService.GetGuildInfo();

        [HttpGet("{guildId:int}")]
        public ActionResult<GuildDetailsInfo?> Get(int guildId) => GetResponse(_guildService.GetGuildDetail(guildId));

        [HttpPost("join")]
        public ActionResult<GuildDetailsInfo?> TryAddCurrentUserToGuild([FromBody] GuildIdDto guildIdDto) =>
            GetResponse(_guildService.AddCurrentUserToGuild(GetCurrentUser(), guildIdDto.GuildId));

        [HttpDelete("leave")]
        public ActionResult<GuildDetailsInfo?> LeaveGuild() =>
            GetResponse(_guildService.RemoveCurrentUserFromGuild(GetCurrentUser()));
        [HttpPost("create")]
        public ActionResult<CreateGuild?> CreateGuild([FromBody] CreateGuild? guild) =>
            GetAnother(_guildService.CreateGuild(guild));

        [Produces("application/json")]
        [HttpDelete("{guildId:int}")]
        public ActionResult<string> DeleteEmploye(int guildId)
        {
            return _guildService.DeleteGuild(guildId);
        }

        private ActionResult<GuildDetailsInfo?> GetResponse(GuildDetailsInfo? guildDetail) =>
            guildDetail == null ? NotFound() : Ok(guildDetail);
        private ActionResult<CreateGuild?> GetAnother(CreateGuild? guild) =>
        guild == null ? NotFound() : Ok(guild);


    }

}