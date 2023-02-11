$(document).ready(function () {
    ShowEmployeeData();
});

function ShowEmployeeData() {
    
    $.ajax({
        url: '/Emp/EmployeeList',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, status, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.empID + '</td>';
                object += '<td>' + item.empName + '</td>';
                object += '<td>' + item.profileImg + '</td>';
                object += '<td>' + item.gender + '</td>';
                object += '<td>' + item.department + '</td>';
                object += '<td>' + item.salary + '</td>';
                object += '<td>' + item.startDate + '</td>';
                object += '<td>' + item.notes + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.empID +');">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete('+item.empID+');">Delete</a></td>';
                object += '<tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert('Something went wrong');
        }
    });
};

$('#btnAddEmployee').click(function () {
    ClearTextBox();
    $('#EmployeeMadal').modal('show');
    $('#empId').hide();
    $('#AddEmployee').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
})

function AddEmployee() {
    var objData = {
        EmpName:$('#empname').val(),
        ProfileImg:$('#profileimg').val(),
        Gender : $('#gender').val(),
        Department : $('#department').val(),
        Salary : $('#salary').val(),
        StartDate: $('#startdate').val(),
        Notes :$('#notes').val()
    }
    $.ajax({
        url: '/Emp/AddEmployee',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('data saved');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopup();
        },
        error() {
            alert('something went wrong');
        }
    });  
}
function ClearTextBox() {
    $('#empname').val('');
    $('#profileimg').val('');
    $('#gender').val('');
    $('#department').val('');
    $('#salary').val('');
    $('#startdate').val('');
    $('#notes').val('');
    $('#EmployeeId').val('');
}
function HideModalPopup() {
    $('#EmployeeMadal').modal('hide');
}
function Delete(empID) {
    if (confirm('Are You Sure, You Want To Delete?')) {
        $.ajax({
            url: '/Emp/Delete?empID=' + empID,
            success: function () {
                alert('Record Deleted');
                ShowEmployeeData();
            },
            error: function () {
                alert("data cant be deleted");
            }
        });
    }
    
}

function Edit(empID) {debugger
    $.ajax({
        url: '/Emp/Edit?empID=' + empID,
        type: 'Get',
        contentType: 'application/json;charset=utf-8;',
        dataType: 'json',
        success: function(response) {
            $('#EmployeeMadal').modal('show');
            $('#EmployeeId').val(response.empID);
            $('#empname').val(response.empName);
            $('#profileimg').val(response.profileImg);
            $('#gender').val(response.gender);
            $('#department').val(response.department);
            $('#salary').val(response.salary);
            $('#startdate').val(response.startdate);
            $('#notes').val(response.notes);
            //$('#AddEmployee').css('display', 'none');
            //$('#btnUpdate').css('display', 'block');


            $('#AddEmployee').hide();
            $('#btnUpdate').show();

        },
        error: function () {
            alert("Record not updated");

        },
    });
}

function UpdateEmployee() {
    var objData = {
        EmpName: $('#empname').val(),
        ProfileImg: $('#profileimg').val(),
        Gender: $('#gender').val(),
        Department: $('#department').val(),
        Salary: $('#salary').val(),
        StartDate: $('#startdate').val(),
        Notes: $('#notes').val()
    }
    $.ajax({
        url: '/Emp/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('data saved');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopup();
        },
        error() {
            alert('something went wrong');
        }
    });
}