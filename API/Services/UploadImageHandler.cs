using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class UploadImageHandler
    {
        public string Upload(IFormFile file) {
            //extension
           string extension = Path.GetExtension(file.FileName);
           List<string> validExtensions = new List<string> {".jpg", ".png", ".gif",".jpeg"};
           if(!validExtensions.Contains(extension)) {
              return $"Ekstenzija nije validna!({string.Join(", ", validExtensions)})";
           }
           //file size
           long size=file.Length; //u bajtovima
           if(size>(5*1024*1024)) {
            return "Maksimalna veličina je 5MB";
           }
           //file name
           string fileName = Guid.NewGuid().ToString()+extension;
           //save on server
           //string path = Path.Combine(Directory.GetCurrentDirectory(),"Uploads");
           string path = @"C:\Users\PC\Desktop\STEMObrazovanje\client\public\images\articles";
          using  FileStream stream = new FileStream(Path.Combine(path,fileName),FileMode.Create);
           file.CopyTo(stream);

        string fileUrl = $"/images/articles/{fileName}";
           return fileUrl;

        }
        
    }
}