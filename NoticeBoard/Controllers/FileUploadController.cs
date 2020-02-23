using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using System.Collections.Generic;
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

            string filePath = "";

            if (file.Length > 0)
            {
                 filePath = Path.GetTempFileName();
                
                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }

            }

            // Process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(new { filePath });
        }

    }
}