using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

public class Employee : HasId {
    [Required]
    public int Id { get; set; }
    public string FName { get; set;}
    public string LName { get; set; }
    public string FullName { get; set; }
    public string Department { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; } //create actual email property here
    public int AdvanceId { get; set; }
    public Advance advance { get; set; }
    public static void createFullName(string FName, string LName){
        Func<string, string, string> FullName = (string fName, string lName) => fName +" "+lName;
    }
    //create function that allows admin user to add employee
}
public class Advent : HasId {
    [Required]
    public int Id { get; set; }
    public string name { get; set; }
    public DateTime startDate { get; set; }
    public DateTime endDate { get; set; }
    public IEnumerable<Advance> Advances { get; set; } = new List<Advance>();
  
    // create function that allows admin user to create new event
}
public class Advance : HasId {
    [Required]
    public int Id { get; set; }
    public Advent advent { get; set; }
    public int AdventId { get; set; }
    public IEnumerable<Section> Sections { get; set; }
    public DateTime dueDate { get; set; }
  
    // create function that allows admin user to create new advance
    // create function that allows admin user to issue new advance to employee (and therefore a specific department)
    // create function that allows admin user to approve/deny advance
    // create function that allows employee user to respond to an advance request
    // create function that allows admin user to create multiple versions of an advance and send certain versions to certain employees (departments)

}
public class Section : HasId { 
    [Required]
    public int Id { get; set; }
    public int AdvanceId { get; set; }
    public Advance advance { get; set; }
    public string SectionName { get; set; }
    public string SectionDescription { get; set; }
    public double Cost { get; set; }
    public IEnumerable<Category> Categories { get; set; }
    // create function that allows admin user to create section and include in a particular advance
}

public class Category : HasId {
    [Required]
    public int Id { get; set; }
    public string CategoryName { get; set; }
    public Section section { get; set; }
    public int SectionId { get; set; }
    public IEnumerable<Option> Options { get; set; }
}
public class Option : HasId {
    [Required]
    public int Id { get; set; }
    public string OptionName { get; set; }
    public int CategoryId { get; set; }
    public Category category { get; set; }
    public Option(string OptionName){
        this.OptionName = OptionName;
    }
    //create function that allows admin user to set options in a category and assign it to a specific category
    // create function that allows employee user to choose from options and post that to advance
}

public partial class DB : IdentityDbContext<IdentityUser> {
    
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Advent> Advents { get; set; }
    public DbSet<Advance> Advances { get; set; }
    public DbSet<Section> Sections { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Option> Options { get; set; }
}

public partial class Handler {
    public void RegisterRepos(IServiceCollection services){
    
        Repo<Employee>.Register(services, "Employees");
        Repo<Advent>.Register(services, "Advents");
        Repo<Advance>.Register(services, "Advances");
        Repo<Section>.Register(services, "Sections");
        Repo<Category>.Register(services, "Categories");
        Repo<Option>.Register(services, "Options");
    }
}