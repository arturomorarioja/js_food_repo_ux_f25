document.querySelector('#btnAbout').addEventListener('click', function(e) {
    e.preventDefault();

    let modal = document.querySelector('#about_message');

    if (!modal) {
        modal = document.createElement('dialog');
        modal.id = 'about_message';
        modal.innerHTML = `
            <header>
                <h2>About us</h2>
                <button class="close">&times;</button>
            </header>
            <section>
                <p>Welcome to Food Repo, your ultimate destination for discovering diverse and delicious food recipes from around the globe. Whether you're craving a quick weeknight meal or an exotic culinary adventure, Food Repo offers a vast collection of recipes that cater to all tastes and skill levels. From hearty stews and refreshing salads to decadent desserts, our recipes feature a wide variety of ingredients—fresh, seasonal, and pantry staples. With contributions from different parts of the world, you'll experience the authentic flavors of Asian, Mediterranean, Latin American, and other international cuisines, all in one place. Each recipe comes with step-by-step instructions, nutritional information, and helpful tips to ensure you create a meal that's not only tasty but also wholesome. Join Food Repo today and explore the joy of cooking, one recipe at a time!</p>
            </section>
        `;
        modal.querySelector('.close').addEventListener('click', (e) => {
            e.preventDefault();
            modal.close();
        });
        modal.addEventListener('close', () => {
            this.blur();    // this refers to the button (the parent)
        });
        document.body.append(modal);
    }
    modal.showModal();
});

// Handling of utility menu options based on whether the user is logged in or not
if (sessionStorage.getItem('food_repo_user_id') !== null) {
    document.querySelector('#utility_logged')?.classList.remove('hidden');
    document.querySelector('#utility_not_logged')?.classList.add('hidden');
} else {
    document.querySelector('#utility_logged')?.classList.add('hidden');
    document.querySelector('#utility_not_logged')?.classList.remove('hidden');
}

// Logging out implies removing user data from sessionStorage
document.querySelector('#btnLogout')?.addEventListener('click', (e) => {
    e.preventDefault();

    sessionStorage.removeItem('food_repo_user_id');
    sessionStorage.removeItem('food_repo_user_token');

    window.location.href = 'index.html';
});