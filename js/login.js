import { USERS_BASE_URL } from './info.js';
import { handleError } from './api.js';

document.querySelector('#frmLogin').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = e.target.txtEmail.value.trim();
    const password = e.target.txtPassword.value.trim();

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);

    fetch(`${USERS_BASE_URL}/auth/login`,
        {
            method: 'POST',
            body: params
        }
    )
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (Object.keys(data).includes('user_id')) {
            sessionStorage.setItem('food_repo_user_id', data.user_id);
            sessionStorage.setItem('food_repo_user_token', data.token);

            window.location.href = 'index.html';
        } else {
            handleError(data.error);
        }
    })
    .catch(handleError);
});