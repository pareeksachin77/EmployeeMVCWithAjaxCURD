using EmployeeMVCWithAjaxCURD.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace EmployeeMVCWithAjaxCURD.Controllers
{
    public class EmpController : Controller
    {
        private readonly EmpContext context;

        public EmpController(EmpContext context)
        {
            this.context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult EmployeeList()
        {
            var data = context.EmpData.ToList();
            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult AddEmployee(EmpModel employee)
        {
            EmpModel emp = new EmpModel();
            emp.EmpName = employee.EmpName;
            emp.ProfileImg = employee.ProfileImg;
            emp.Gender = employee.Gender;
            emp.Department = employee.Department;
            emp.Salary = employee.Salary;
            emp.StartDate = employee.StartDate;
            emp.Notes = employee.Notes;

            //var emp = new EmpModel()
            //{
            //    EmpName = employee.EmpName,
            //    ProfileImg = employee.ProfileImg,
            //    Gender=employee.Gender,
            //    Department=employee.Department,
            //    Salary=employee.Salary,
            //    StartDate=employee.StartDate,
            //    Notes=employee.Notes
            //};
            context.EmpData.Add(emp);
            context.SaveChanges();
            return new JsonResult("data saved");
        }
        public JsonResult Delete(int empID)
        {
            var data = context.EmpData.Where(e => e.EmpID == empID).SingleOrDefault();
            context.EmpData.Remove(data);
            context.SaveChanges();
            return new JsonResult("Data Deleted");

        }
        public JsonResult Edit(int empID)
        {
            var data = context.EmpData.Where(e => e.EmpID == empID).SingleOrDefault();
            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult Update(EmpModel employee)
        {
            context.EmpData.Update(employee);
            context.SaveChanges();
            return new JsonResult("Record Updated");
        }
    }
}
