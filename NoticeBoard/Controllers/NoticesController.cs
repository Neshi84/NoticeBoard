using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoticeBoard.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using X.PagedList;

namespace NoticeBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticesController : ControllerBase
    {
        private readonly NoticeContext _context;

        public NoticesController(NoticeContext context)
        {
            _context = context;
        }

        // GET: api/Notices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notice>>> GetNotices(int page = 1, int pageSize = 10)
        {
            var notices = await _context.Notices.Include(n => n.UploadedFiles).ToPagedListAsync(page, pageSize);

            return Ok(notices);
        }

        // GET: api/Notices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Notice>> GetNotice(int id)
        {
            var notice = await _context.Notices.FindAsync(id);

            if (notice == null)
            {
                return NotFound();
            }

            return notice;
        }

        // PUT: api/Notices/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotice(int id, Notice notice)
        {
            if (id != notice.Id)
            {
                return BadRequest();
            }

            _context.Entry(notice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoticeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Notices
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Notice>> PostNotice(Notice notice)
        {
            _context.Notices.Add(notice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNotice", new { id = notice.Id }, notice);
        }

        // DELETE: api/Notices/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Notice>> DeleteNotice(int id)
        {
            var notice = await _context.Notices.FindAsync(id);
            if (notice == null)
            {
                return NotFound();
            }

            _context.Notices.Remove(notice);
            await _context.SaveChangesAsync();

            return notice;
        }

        private bool NoticeExists(int id)
        {
            return _context.Notices.Any(e => e.Id == id);
        }
    }
}
