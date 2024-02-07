using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    public async Task<IActionResult> UploadImagemAngular(int produtoId)
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

            var ProdutoRetorno = await _produtoService.UpdateProdutoAsync(produto, produtoId);

            return Ok(ProdutoRetorno);
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro {ex.Message}");
        }
    }

    [HttpPost("upload/{produtoId}")]
    [AllowAnonymous]
    public async Task<IActionResult> UploadImagem([FromForm] ICollection<IFormFile> files, int produtoId)
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

            var ProdutoRetorno = await _produtoService.UpdateProdutoAsync(produto, produtoId);

            return Ok(ProdutoRetorno);
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro {ex.Message}");
        }
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetProduto(int produtoId)
    {
        try
        {
            var produto = await _produtoService.GetProdutoByIdAsync(produtoId);

            return Ok(produto);
        }
        catch (System.Exception)
        {
            
            throw;
        }
    }
}
