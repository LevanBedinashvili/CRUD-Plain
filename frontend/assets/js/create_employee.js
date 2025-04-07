const form = document.getElementById('employeeForm');
const message = document.getElementById('message');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
        first_name: document.getElementById('first_name').value.trim(),
        last_name: document.getElementById('last_name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        position: document.getElementById('position').value.trim()
    };


    // Validation
    const errors = [];
    if (!data.first_name) errors.push("First name is required.");
    if (!data.last_name) errors.push("Last name is required.");
    if (!data.email) {
        errors.push("Email is required.");
    } else if (!validateEmail(data.email)) {
        errors.push("Please enter a valid email address.");
    }
    if (!data.phone) {
        errors.push("Phone number is required.");
    } else if (!validatePhone(data.phone)) {
        errors.push("Please enter a valid phone number.");
    }
    if (!data.position) errors.push("Position is required.");

    if (errors.length > 0) {
        message.innerHTML = ''; 
        errors.forEach(err => {
            const alert = document.createElement('div');
            alert.className = 'alert alert-danger';
            alert.innerText = err;
            message.appendChild(alert);
        });
        return; 
    }

    fetch('http://localhost:8000/api/employees.php', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(response => {
        message.innerHTML = ''; 

        if (response.errors) {
            response.errors.forEach(err => {
                const alert = document.createElement('div');
                alert.className = 'alert alert-danger';
                alert.innerText = err;
                message.appendChild(alert);
            });
        } else if (response.success) {
            const alert = document.createElement('div');
            alert.className = 'alert alert-success';
            alert.innerText = response.success;
            message.appendChild(alert);
            form.reset();
        } else if (response.error) {
            const alert = document.createElement('div');
            alert.className = 'alert alert-danger';
            alert.innerText = response.error;
            message.appendChild(alert);
        }
    })
    .catch(error => {
        message.innerHTML = '<div class="alert alert-danger">Something went wrong. Please try again.</div>';
        console.error(error);
    });
});

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
}
