using SisCommerceAPI.Models.Dto;
using SisCommerceAPI.Models.Entidades;

namespace SisCommerceAPI.Services.Interfaces;

public interface IProdutosService
{
    Task<Produto> GetProdutoByIdAsync(int produtoId);
    void DeleteImage(string imageName);
    Task<string> SaveImage(IFormFile formFile);
    Task<Produto> AddProdutoAsync(Produto produto);
    Task<Produto> UpdateProdutoAsync(Produto produto, int produtoId);
    Task<bool> RemoveProdutoAsync(int produtoId);
    Task<List<Produto>> GetProdutosAsync();
}
