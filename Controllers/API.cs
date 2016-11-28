using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;

[Route("/AdventLocation")]
public class AdventLocationController : Controller 
{
    private GoogleLocationService gs;
    public AdventLocationController(GoogleLocationService gs){
        this.gs = gs;
    }

    [HttpGet("/{address}")]
    public async Task<IActionResult> Location(string address)
    {
        var data = await gs.Get(address);
       
        data.Log();
        return Ok(data);
    }
}

[Route("api/advent")]
public class AdventController : CRUDController<Advent> {
    public AdventController(IRepository<Advent> r) : base(r){}
}

[Route("/api/advance")]
public class AdvanceController : CRUDController<Advance> {
    public AdvanceController(IRepository<Advance> r) : base(r){}
}

[Route("api/employee")]
public class EmployeeController : CRUDController<Employee> {
    public EmployeeController(IRepository<Employee> r) : base(r){}
}

[Route("/api/section")]
public class SectionController : CRUDController<Section> {
    public SectionController(IRepository<Section> r) : base(r){}
}

[Route("/api/category")]
public class CategoryController : CRUDController<Category> {
    public CategoryController(IRepository<Category> r) : base(r){}
}

[Route("/api/option")]
public class OptionController : CRUDController<Option> {
    public OptionController(IRepository<Option> r) : base(r){}
}
