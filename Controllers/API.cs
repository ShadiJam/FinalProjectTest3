using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[Route("/location")]
public class LocationSearchController: CRUDController<LocationSearch.RootObject> 
{
    private GoogleLocationService gs;
    public LocationSearchController(IRepository<LocationSearch.RootObject> r, GoogleLocationService gs) : base(r) {
        this.gs = gs;
        this.r = r;
    }

    [HttpGet("/{address}")]
    public async Task<IActionResult> Search(string address)
    {
        var data = await gs.Get(address);
        // var lat1 = data.results.ElementAt(0).geometry.location.lat;
        // var lng1 = data.results.ElementAt(0).geometry.location.lng;
        // var formatted_address = data.results.ElementAt(0).formatted_address;
       
        data.Log();
        return Ok(r.Create(data));

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
