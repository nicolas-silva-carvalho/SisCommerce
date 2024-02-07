using Microsoft.EntityFrameworkCore;
using SisCommerceAPI.DataBase;
using SisCommerceAPI.Models.Dto;
using SisCommerceAPI.Models.Entidades;
using SisCommerceAPI.Services.Interfaces;

namespace SisCommerceAPI.Services
{
    public class ProdutoService : IProdutosService
    {
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly Context _context;
        
        public ProdutoService(IWebHostEnvironment hostEnvironment, Context context)
        {
            _hostEnvironment = hostEnvironment;
            _context = context;
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

        public async Task<Produto> GetProdutoByIdAsync(int produtoId)
        {
            var produto = await _context.Produtos.FirstOrDefaultAsync(p => p.Id == produtoId);

            if (produto == null ) throw new Exception("Produto não encontrado");

            return produto;
        }

        public async Task<Produto> AddProdutoAsync(Produto produto)
        {
            try
            {
                var produtoContext = await GetProdutoByIdAsync(produto.Id);

                if (produtoContext == null) throw new Exception("Produto não encontrado");

                _context.Produtos.Add(produto);
                await _context.SaveChangesAsync();

                return produto;
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public async Task<Produto> UpdateProdutoAsync(Produto produto, int produtoId)
        {
            try
            {
                var produtoContext = await GetProdutoByIdAsync(produto.Id);

                if (produtoContext == null) throw new Exception("Produto não encontrado");

                produto.Id = produtoContext.Id;

                _context.Update(produto);
                await _context.SaveChangesAsync();

                return produto;
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        public async Task<bool> RemoveProdutoAsync(int produtoId)
        {
            try
            {
                var produto = await GetProdutoByIdAsync(produtoId);

                if (produto == null) throw new Exception("Produto não encontrado");

                _context.Remove(produto);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (System.Exception)
            {
                
                throw;
            }
        }

        public async Task<List<Produto>> GetProdutosAsync()
        {
            return await _context.Produtos.ToListAsync();
        }
    }
}