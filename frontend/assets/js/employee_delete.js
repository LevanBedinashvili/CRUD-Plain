
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const employeeId = e.target.dataset.id;
        const message = document.getElementById('message');
        message.innerHTML = ''; // clear previous

        if (confirm('Are you sure you want to delete this employee?')) {
            fetch('http://localhost:8000/api/index.php', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: employeeId })
            })
            .then(res => res.json())
            .then(response => {
                if (response.success) {
                    const alert = document.createElement('div');
                    alert.className = 'alert alert-success';
                    alert.innerText = response.success;
                    message.appendChild(alert);

                    e.target.closest('tr').remove();
                } else if (response.error) {
                    const alert = document.createElement('div');
                    alert.className = 'alert alert-danger';
                    alert.innerText = response.error;
                    message.appendChild(alert);
                }
            })
            .catch(err => {
                console.error(err);
                message.innerHTML = '<div class="alert alert-danger">Something went wrong. Please try again.</div>';
            });
        }
    }
});
