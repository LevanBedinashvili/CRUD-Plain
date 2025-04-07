function fetchEmployeeList() {
    $.ajax({
        url: 'http://localhost:8000/api/employees.php', 
        method: 'GET', 
        contentType: 'application/json',
        success: function(response) {
            if (Array.isArray(response) && response.length > 0) {
                $('#employeeListBody').empty();
                response.forEach(function(employee, index) {
                    var row = `<tr>
                        <td>${index + 1}</td>
                        <td>${employee.first_name}</td>
                        <td>${employee.last_name}</td>
                        <td>${employee.email}</td>
                        <td>${employee.phone}</td>
                        <td>${employee.position}</td>
                        <td><button class="btn btn-info btn-sm edit-btn" data-id="${employee.id}">Edit Employee</button></td>
                        <td><button class="btn btn-danger btn-sm delete-btn" data-id="${employee.id}">Delete Employee</button></td>
                    </tr>`;
                    $('#employeeListBody').append(row);
                });
            } else {
                $('#employeeListBody').append('<tr><td colspan="8" class="text-center">No employees found</td></tr>');
            }
        }
    });
}

$(document).on('click', '.edit-btn', function () {
    const id = $(this).data('id');
    window.location.href = `edit_employee.html?id=${id}`;
});
