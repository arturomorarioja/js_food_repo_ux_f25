import { BASE_URL } from './info.js';

let recipeID = new URLSearchParams(window.location.search);
recipeID = recipeID.get('id');

fetch(`${BASE_URL}/lookup.php?i=${recipeID}`)
.then(response => response.json())
.then(data => {
    data = data.meals[0];
    console.log(data);    
    
    document.querySelector('h2').innerText = data.strMeal;

    const picture = document.querySelector('img');
    picture.setAttribute('src', `${data.strMealThumb}/medium`);
    picture.setAttribute('alt', data.strMeal);
    document.querySelector('picture > source').setAttribute('srcset', `${data.strMealThumb}/large`);

    document.querySelector('div:has(.pill) > p:first-of-type').innerText = data.strCategory;
    document.querySelector('div:has(.pill) > p:last-of-type').innerText = data.strArea;

    document.querySelector('#instructions').innerText = data.strInstructions;

    const ingredients = document.createDocumentFragment();
    for (let index = 0; index < 20; index++) {
        const ingredientText = data[`strIngredient${index + 1}`];
        if (ingredientText === '' || ingredientText === null) { break; }

        const ingredient = document.createElement('li');
        ingredient.innerText = `${ingredientText}, ` +
            data[`strMeasure${index + 1}`];
        ingredients.append(ingredient);
    }
    document.querySelector('#ingredients > ul').append(ingredients);

    let videoID = new URLSearchParams(new URL(data.strYoutube).search);
    videoID = videoID.get('v');
    console.log(videoID);
    
    const videoThumbnail = new Image();
    videoThumbnail.setAttribute('src', `https://img.youtube.com/vi/${videoID}/mqdefault.jpg`)
    videoThumbnail.addEventListener('load', function() {
        if (this.width !== 120) {
            const video = document.querySelector('#recipeVideo');
            video.setAttribute('src', `https://www.youtube.com/embed/${videoID}`);
            video.classList.add('visible');
        }
    });

})
.catch(error => console.log(error));