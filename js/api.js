export const handleError = (error) => {
    document.querySelector('#errorText').innerText = error;
    document.querySelector('#error').classList.remove('hidden');
};