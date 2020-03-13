using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoticeBoard.Models;

namespace NoticeBoard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoticeTypesController : ControllerBase
    {
        private readonly NoticeContext _context;

        public NoticeTypesController(NoticeContext context)
        {
            _context = context;
        }

        // GET: api/NoticeTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoticeType>>> GetNoticeTypes()
        {
            return await _context.NoticeTypes.ToListAsync();
        }

        // GET: api/NoticeTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NoticeType>> GetNoticeType(int id)
        {
            var noticeType = await _context.NoticeTypes.FindAsync(id);

            if (noticeType == null)
            {
                return NotFound();
            }

            return noticeType;
        }

        // PUT: api/NoticeTypes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNoticeType(int id, NoticeType noticeType)
        {
            if (id != noticeType.Id)
            {
                return BadRequest();
            }

            _context.Entry(noticeType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoticeTypeExists(id))
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

        // POST: api/NoticeTypes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<NoticeType>> PostNoticeType(NoticeType noticeType)
        {
            _context.NoticeTypes.Add(noticeType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNoticeType", new { id = noticeType.Id }, noticeType);
        }

        // DELETE: api/NoticeTypes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<NoticeType>> DeleteNoticeType(int id)
        {
            var noticeType = await _context.NoticeTypes.FindAsync(id);
            if (noticeType == null)
            {
                return NotFound();
            }

            _context.NoticeTypes.Remove(noticeType);
            await _context.SaveChangesAsync();

            return noticeType;
        }

        private bool NoticeTypeExists(int id)
        {
            return _context.NoticeTypes.Any(e => e.Id == id);
        }
    }
}
