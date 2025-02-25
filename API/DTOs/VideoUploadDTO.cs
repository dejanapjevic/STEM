using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class VideoUploadDto
{
    public IFormFile File { get; set; }
    public string Title { get; set; }
    public int TutorialId { get; set; }
}

}