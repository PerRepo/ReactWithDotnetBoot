using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_API.Data;
using Web_API.Models;
using Web_API.Models.DTO;
using Web_API.Utility;



namespace Web_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MenuItemController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly ApiResponse _response;
        private readonly IWebHostEnvironment _webHostEnvironmen;
        public MenuItemController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironmen)
        {
            _db = context;
            _response = new ApiResponse();
            _webHostEnvironmen = webHostEnvironmen;
        }

        [HttpGet]
        public async Task<ActionResult> GetMenuItems()
        {
            //var menuItems = await _db.MenuItems.ToListAsync();
            _response.Result = _db.MenuItems;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [HttpGet("{id:int}", Name = "GetMenuItem")]
        public async Task<IActionResult> GetMenuItem(int id)
        {
            if (id == 0)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                return BadRequest(_response);
            }

            MenuItem menuItem = await _db.MenuItems.FirstOrDefaultAsync(u => u.Id == id);
            if (menuItem == null)
            {
                _response.StatusCode = System.Net.HttpStatusCode.NotFound;
                return NotFound(_response);
            }

            _response.Result = menuItem;
            _response.StatusCode = System.Net.HttpStatusCode.OK;

            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse>> CreateMenuItem([FromForm] MenuItemCreateDTO menuItemDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (menuItemDto.File == null || menuItemDto.File.Length == 0)
                    {
                        _response.StatusCode = HttpStatusCode.BadRequest;
                        _response.ErrorMessages.Add("File is not selected");
                        return BadRequest(_response);
                    }

                    // Save the file to the server
                    string fileName = $"{Guid.NewGuid()}{Path.GetExtension(menuItemDto.File.FileName)}";
                    string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "/Upload/Images", fileName);

                    MenuItem menuItemCrate = new()
                    {
                        Name = menuItemDto.Name,
                        Description = menuItemDto.Description,
                        SpecialTag = menuItemDto.SpecialTag,
                        Category = menuItemDto.Category,
                        Price = menuItemDto.Price,
                        Image = filePath
                    };

                    await _db.MenuItems.AddAsync(menuItemCrate);
                    await _db.SaveChangesAsync();
                    _response.Result = menuItemCrate;
                    _response.StatusCode = HttpStatusCode.Created;
                    return CreatedAtRoute("GetMenuItem", new { id = menuItemCrate.Id }, _response);
                }
                else
                {
                    _response.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.Message };
                _response.StatusCode = HttpStatusCode.InternalServerError;
            }
            return _response;
        }

        [HttpPut]
        [Route("[action]/{id:int}")]
        public async Task<ActionResult<ApiResponse>> UpdateMenuItem(int id, [FromForm] MenuItemUpdateDTO menuItemDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (menuItemDto == null || menuItemDto.Id != id)
                    {
                        return BadRequest();
                    }

                    MenuItem menuItemFromDb = await _db.MenuItems.FindAsync(id);
                    if (menuItemFromDb == null)
                    {
                        return NotFound();
                    }

                    menuItemFromDb.Name = menuItemDto.Name;
                    menuItemFromDb.Description = menuItemDto.Description;
                    menuItemFromDb.SpecialTag = menuItemDto.SpecialTag;
                    menuItemFromDb.Category = menuItemDto.Category;
                    menuItemFromDb.Price = menuItemDto.Price;

                    if (menuItemDto.File != null && menuItemDto.File.Length > 0)
                    {
                        // Save the file to the server
                        menuItemFromDb.Image = "";
                        string fileName = $"{Guid.NewGuid()}{Path.GetExtension(menuItemDto.File.FileName)}";
                        string filePath = Path.Combine(_webHostEnvironmen.ContentRootPath, "wwwroot", "Upload/Images", fileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await menuItemDto.File.CopyToAsync(stream);
                        }

                        menuItemFromDb.Image = filePath;
                    }

                    _db.MenuItems.Update(menuItemFromDb);
                    await _db.SaveChangesAsync();
                    _response.Result = menuItemFromDb;
                    _response.StatusCode = HttpStatusCode.NoContent;
                    return Ok(_response);
                }
                else
                {
                    _response.IsSuccess = false;
                }
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.Message };
                _response.StatusCode = HttpStatusCode.InternalServerError;
            }
            return _response;
        }

        [HttpDelete]
        [Route("[action]/{id:int}")]
        [Authorize(Roles = SD.Role_Admin)]
        public async Task<ActionResult<ApiResponse>> DeleteMenuItem(int id)
        {
            try
            {
                if (id == 0)
                {
                    return BadRequest();
                }

                MenuItem menuItemFromDb = await _db.MenuItems.FindAsync(id);
                if (menuItemFromDb == null)
                {
                    return NotFound();
                }

                string filePath = menuItemFromDb.Image;

                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }

                int miliseconds = 2000;
                Thread.Sleep(miliseconds);

                _db.MenuItems.Remove(menuItemFromDb);
                await _db.SaveChangesAsync();
                _response.StatusCode = HttpStatusCode.NoContent;
                return Ok(_response);

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessages = new List<string>() { ex.Message };
                _response.StatusCode = HttpStatusCode.InternalServerError;
            }
            return _response;
        }
    }
}