document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault();  // Evitar que se recargue la página

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Realizar la petición al servidor
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem('userId', data.userId); // Guardar solo la ID
            console.log('ID de usuario guardada en sessionStorage:', data.userId);
            window.location.href = '/restaurants';
        } else {
            const error = await response.json();
            alert(error.message);
        }
    });
});
