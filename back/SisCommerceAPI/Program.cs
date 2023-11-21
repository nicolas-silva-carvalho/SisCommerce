using Microsoft.EntityFrameworkCore;
using SisCommerceAPI.DataBase;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Context>(x => x.UseNpgsql(builder.Configuration.GetConnectionString("SisCommerceDB")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
