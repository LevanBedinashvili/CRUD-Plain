function getEmployeeIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function fetchEmployeeData(id) {
    $.ajax({
        url: `http://localhost:8000/api/employees.php?id=${id}`,
        method: 'GET',
        contentType: 'application/json',
        success: function (response) {
            const data = typeof response === 'string' ? JSON.parse(response) : response;

            $('#employeeId').val(data.id);
            $('#firstName').val(data.first_name);s
            $('#lastName').val(data.last_name);
            $('#email').val(data.email);
            $('#phone').val(data.phone);
            $('#position').val(data.position);
        },
        error: function () {
            $('#responseMessage').html(`<div class="alert alert-danger">Failed to fetch employee data.</div>`);
        }
    });
}

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^\d+$/; 
    return regex.test(phone);
}

$('#editEmployeeForm').submit(function (e) {
    e.preventDefault();

    const employeeData = {
        id: $('#employeeId').val(),
        first_name: $('#firstName').val().trim(),
        last_name: $('#lastName').val().trim(),
        email: $('#email').val().trim(),
        phone: $('#phone').val().trim(),
        position: $('#position').val().trim()
    };

    // Validation
    const errors = [];
    if (!employeeData.first_name) errors.push("First name is required.");
    if (!employeeData.last_name) errors.push("Last name is required.");
    if (!employeeData.email) {
        errors.push("Email is required.");
    } else if (!validateEmail(employeeData.email)) {
        errors.push("Please enter a valid email address.");
    }
    if (!employeeData.phone) {
        errors.push("Phone number is required.");
    } else if (!validatePhone(employeeData.phone)) {
        errors.push("Phone number must be numeric.");
    }
    if (!employeeData.position) errors.push("Position is required.");

    if (errors.length > 0) {
        $('#responseMessage').html(errors.map(err => `<div class="alert alert-danger">${err}</div>`).join(''));
        return;
    }

    $.ajax({
        url: 'http://localhost:8000/api/employees.php',
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(employeeData),
        success: function (response) {
            $('#responseMessage').html(`<div class="alert alert-success">${response.success}</div>`);
        },
        error: function (xhr) {
            const res = xhr.responseJSON;
            const errorHTML = res?.errors?.map(err => `<div>${err}</div>`).join('') || 'Failed to update.';
            $('#responseMessage').html(`<div class="alert alert-danger">${errorHTML}</div>`);
        }
    });
});

$(document).ready(function () {
    const id = getEmployeeIdFromURL();
    if (id) {
        fetchEmployeeData(id);
    } else {
        $('#responseMessage').html(`<div class="alert alert-danger">No employee ID specified.</div>`);
    }
});
