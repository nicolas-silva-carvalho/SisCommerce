using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SisCommerceAPI.Extensions;
using SisCommerceAPI.Models.Dto;
using SisCommerceAPI.Services.Interfaces;

namespace SisCommerceAPI.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class ProdutoController : ControllerBase
{
    private readonly IProdutosService _produtoService;
    public ProdutoController(IProdutosService produtosService)
    {
        _produtoService = produtosService;
    }

    [HttpPost("upload-imagem/{produtoId}")]
    [AllowAnonymous]
    public async Task<IActionResult> UploadImagem(int produtoId)
    {
        try
        {
            var produto = await _produtoService.GetProdutoByIdAsync(produtoId);

            if (produto == null) return NoContent();

            var file = Request.Form.Files[0];
            if (file.Length > 0)
            {
                _produtoService.DeleteImage(produto.ImagemURL);
                produto.ImagemURL = await _produtoService.SaveImage(file);
            }

            var ProdutoRetorno = await _produtoService.UploadProduto(produtoId, produto);

            return Ok(ProdutoRetorno);
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro {ex.Message}");
        }
    }
}
