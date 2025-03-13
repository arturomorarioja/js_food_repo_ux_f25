import { BASE_URL } from './info.js';

let recipeID = new URLSearchParams(window.location.search);
recipeID = recipeID.get('id');

fetch(`${BASE_URL}/lookup.php?i=${recipeID}`)
.then(response => response.json())
.then(data => {
    data = data.meals[0];
    console.log(data);

    document.querySelector('h2').innerText = data.strMeal;

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
.catch(error => console.log(error));

