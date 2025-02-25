namespace API.Entities
{
    public class Video
    {

        public int Id { get; set; }
        public string Title { get; set; }
        public string Path { get; set; }
        public int TutorialId { get; set; } //strani kljuc ka tutorial-u
        public Tutorial tutorial { get; set; } //navigacija
    }


}