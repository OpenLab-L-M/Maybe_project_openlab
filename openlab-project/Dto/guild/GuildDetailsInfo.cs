namespace openlab_project.Dto.guild
{
    public class GuildDetailsInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public string Description { get; set; }
        public IEnumerable<UserInfo> Members { get; set; }
    }
}
