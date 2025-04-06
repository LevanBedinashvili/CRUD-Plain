function fetchEmployeeList() {
    $.ajax({
        url: 'http://localhost:8000/api/index.php', 
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
                        <td><button class="btn btn-warning btn-sm edit-btn" data-id="${employee.id}">Edit</button></td>
                        <td><button class="btn btn-danger btn-sm delete-btn" data-id="${employee.id}">Delete</button></td>
                    </tr>`;
                    $('#employeeListBody').append(row);
                });
            } else {
                $('#employeeListBody').append('<tr><td colspan="8" class="text-center">No employees found</td></tr>');
            }
        }
    });
}
