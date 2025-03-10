using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class UploadImageHandler
    {
        public string Upload(IFormFile file)
        {
            
            string extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            List<string> validExtensions = new List<string> { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp", ".avif" };
            if (!validExtensions.Contains(extension))
            {
                return $"Ekstenzija nije validna!({string.Join(", ", validExtensions)})";
            }

            long size = file.Length;

            if (size > (7 * 1024 * 1024))
            {
                return "Maksimalna veličina je 7MB";

            }
            string fileName = Guid.NewGuid().ToString() + extension;
            string path = @"C:\Users\PC\Desktop\STEM\client\public\images\articles";
            using FileStream stream = new FileStream(Path.Combine(path, fileName), FileMode.Create);
            file.CopyTo(stream);

            string fileUrl = $"/images/articles/{fileName}";
            return fileUrl;

        }

        public string UploadProfilePicture(IFormFile file)
        {
            
            string extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            List<string> validExtensions = new List<string> { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp", ".aif"};
            if (!validExtensions.Contains(extension))
            {
                return $"Ekstenzija nije validna!({string.Join(", ", validExtensions)})";
            }

            long size = file.Length;

            if (size > (7 * 1024 * 1024))
            {
                return "Maksimalna veličina je 7MB";

            }
            string fileName = Guid.NewGuid().ToString() + extension;
            string path = @"C:\Users\PC\Desktop\STEM\client\public\images\profilePictures";
            using FileStream stream = new FileStream(Path.Combine(path, fileName), FileMode.Create);
            file.CopyTo(stream);

            string fileUrl = $"/images/profilePictures/{fileName}";
            return fileUrl;

        }

    }
}