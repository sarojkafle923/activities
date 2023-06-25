using API.Extensions;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {
        private IMediator mediator;

        protected IMediator Mediator => mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result is null)
            {
                return NotFound();
            }

            if (result.IsSuccess && result.Value is not null)
            {
                return Ok(result.Value);
            }

            if (result.IsSuccess && result.Value is null)
            {
                return NotFound();
            }

            return BadRequest(result.Error);
        }

        protected ActionResult HandlePagedResult<T>(Result<PagedList<T>> result)
        {
            if (result is null)
            {
                return NotFound();
            }

            if (result.IsSuccess && result.Value is not null)
            {
                Response.AddPaginationHeader(result.Value.CurrentPage, result.Value.PageSize, result.Value.TotalCount, result.Value.TotalPages);

                return Ok(result.Value);
            }

            if (result.IsSuccess && result.Value is null)
            {
                return NotFound();
            }

            return BadRequest(result.Error);
        }
    }
}
