using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SisCommerceAPI.Models;
using SisCommerceAPI.Models.Dto;

namespace SisCommerceAPI.Services.Interfaces;

public interface IProdutosService
{
    Task<Produto> GetProdutoByIdAsync(int produtoId);
    Task<ProdutoDto> UploadProduto(int produtoId, Produto produto);
    void DeleteImage(string imageName);
    Task<string> SaveImage(IFormFile formFile);
}
