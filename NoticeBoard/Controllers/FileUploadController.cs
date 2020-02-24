using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace NoticeBoard.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> PostUploadAsync(IFormFile file)
        {

            var extension=Path.GetExtension(file.FileName);
            string fileName = Guid.NewGuid().ToString("N")+extension;
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads",fileName);
           

            if (file.Length > 0)
            {
               
                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }

            }

            return Ok(new { fileName });
        }

    }
}