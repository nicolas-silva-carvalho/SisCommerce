using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SisCommerceAPI.Models;
using SisCommerceAPI.Models.Dto;
using SisCommerceAPI.Services.Interfaces;

namespace SisCommerceAPI.Services
{
    public class ProdutoService : IProdutosService
    {
        private readonly IWebHostEnvironment _hostEnvironment;
        
        public ProdutoService(IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
        }

        public async Task<string> SaveImage(IFormFile formFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(formFile.FileName).Take(10).ToArray()).Replace(' ', '-');

            imageName = $"{imageName}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(formFile.FileName)}";

            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/Images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await formFile.CopyToAsync(fileStream);
            }

            return imageName;
        }

        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/Images", imageName);

            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }

        public Task<Produto> GetProdutoByIdAsync(int produtoId)
        {
            throw new NotImplementedException();
        }

        public Task<ProdutoDto> UploadProduto(int produtoId, Produto produto)
        {
            throw new NotImplementedException();
        }
    }
}