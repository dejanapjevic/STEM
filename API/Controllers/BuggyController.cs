
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController:BaseApiController
    {
        //treba za svaku metodu jedinstveni root
        [HttpGet("not-found")]
        public ActionResult GetNotFound() {
        return NotFound(); //404
        }

         [HttpGet("bad-request")]
        public ActionResult GetBadRequest() {
        return BadRequest(new ProblemDetails{Title="This is a bad request"}); //400
        }

         [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized() {
        return Unauthorized(); //autentifikacija
        }

         [HttpGet("validation-error")]
        public ActionResult GetValidationError() {
        ModelState.AddModelError("Problem1", "This is a first error");
        ModelState.AddModelError("Problem2", "This is a second error");
        return ValidationProblem();
        }
         [HttpGet("server-error")]
        public ActionResult GetServerError() {
        //vraca exception 500
        throw new Exception("This is a server error");
        }
    }
}