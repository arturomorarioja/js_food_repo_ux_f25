export const handleError = (error) => {
    document.querySelector('#errorText').innerText = error;
    document.querySelector('#error').classList.remove('hidden');
};

export const header = new Headers({
    'X-Session-Token': sessionStorage.getItem('food_repo_user_token')
});