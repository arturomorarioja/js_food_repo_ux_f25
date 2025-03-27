import { BASE_URL, USERS_BASE_URL } from './info.js';
import { handleError, header } from './api.js';

let recipeID = new URLSearchParams(window.location.search);
recipeID = recipeID.get('id');

fetch(`${BASE_URL}/lookup.php?i=${recipeID}`)
.then(response => response.json())
.then(data => {
    data = data.meals[0];
    console.log(data);

    document.querySelector('h2').innerText = data.strMeal;
    if (sessionStorage.getItem('food_repo_user_id') !== null) {
        document.querySelector('#btnFavourite').classList.remove('hidden');
    }

    const picture = document.querySelector('#picture_meal');
    picture.src = data.strMealThumb;
    picture.alt = data.strMeal;

    document.querySelector('#description').innerText = data.strInstructions;

    const ingredients = document.createDocumentFragment();
    for (let index = 0; index < 20; index++) {
        const ingredientText = data[`strIngredient${index + 1}`];
        if (ingredientText === '' || ingredientText === null) { 
            break; 
        }

        const ingredient = document.createElement('li');
        ingredient.innerText = ingredientText + ', ' +
            data[`strMeasure${index + 1}`];

        ingredients.append(ingredient);
    }
    document.querySelector('#ingredients').append(ingredients);
})
.catch(handleError);

document.querySelector('#btnFavourite').addEventListener('click', function(e) {
    e.preventDefault();

    const markAsFavourite = this.innerText === '☆';
    const userID = sessionStorage.getItem('food_repo_user_id');

    const params = new URLSearchParams();
    params.append('recipe_id', recipeID);

    fetch(`${USERS_BASE_URL}/users/${userID}/favourites`,
        {
            method: markAsFavourite ? 'POST' : 'DELETE',
            headers: header,
            body: params
        }
    )
    .then(response => response.json())
    .then(data => {
        console.log(data);
        this.innerHTML = markAsFavourite ? '&#9733;' : '&#9734;';    // Black or white star
    })
    .catch(handleError);
});