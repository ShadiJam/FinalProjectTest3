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


namespace LocationSearch {

    public class Location : HasId {
        [Required]
        public int Id { get; set; }
        public double lat { get; set; }
        public double lng { get; set; }
        }

    public class Geometry : HasId {
        [Required]
        public int Id { get; set; }
        public Location location { get; set; }
    }

    public class Result : HasId {
        [Required]
        public int Id { get; set; }
        public string formatted_address { get; set; }
        public Geometry geometry { get; set; }
    }

    public class RootObject : HasId {
        [Required]
        public int Id { get; set; }
        public List<Result> results { get; set; }
    }
}