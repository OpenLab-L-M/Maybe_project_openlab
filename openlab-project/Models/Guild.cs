namespace openlab_project.Models
{
    public class Guild
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public int Capacity { get; set; }
        public ICollection<ApplicationUser> Members { get; } = new List<ApplicationUser>();
    }
}
