import { USERS_BASE_URL } from './info.js';

document.querySelector('#frmSignup').addEventListener('submit', (e) => {
    e.preventDefault();

    // Password validation
    const password = e.target.txtPassword.value.trim();
    const repeatPassword = e.target.txtRepeatPassword.value.trim();

    if (password !== repeatPassword) {
        document.querySelector('#errorText').innerText = 'Passwords must match.';
        document.querySelector('#error').classList.remove('hidden');
        return false;
    }

    // Form submission
    const firstName = e.target.txtFirstName.value.trim();
    const lastName = e.target.txtLastName.value.trim();
    const email = e.target.txtEmail.value.trim();

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('first_name', firstName);
    params.append('last_name', lastName);
    params.append('password', password);

    fetch(`${USERS_BASE_URL}/users`,
        {
            method: 'POST',
            body: params
        }
    )
    .then(response => response.json())
    .then(data => {
        window.location.href = 'login.htm';
    })
    .catch(error => console.log(error));
});