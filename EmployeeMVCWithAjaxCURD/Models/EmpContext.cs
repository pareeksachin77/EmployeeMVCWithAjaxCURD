using Microsoft.EntityFrameworkCore;

namespace EmployeeMVCWithAjaxCURD.Models
{
    public class EmpContext:DbContext
    {
        public EmpContext(DbContextOptions<EmpContext> options):base(options)
        { }
        //To Genrate Table Name EmpData
        public DbSet<EmpModel> EmpData { get; set; }
    }
}
