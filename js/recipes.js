import { BASE_URL } from './info.js';

const DEFAULT_RECIPES = 10;

// eslint-disable-next-line no-unused-vars
const showRandomRecipesWithInnerHTML = (numRecipes = DEFAULT_RECIPES) => {

    for (let index = 0; index < numRecipes; index++) {

        fetch(`${BASE_URL}/random.php`)
        .then(response => response.json())
        .then(data => {
            data = data.meals[0];
            document.querySelector('#recipe-list').innerHTML += `
                <article>
                    <header>
                        <h2>${data.strMeal}</h2>
                    </header>
                    <img src="${data.strMealThumb}/preview" alt="${data.strMeal}">
                    <div>
                        <p class="pill">${data.strCategory}</p>
                        <p class="pill">${data.strArea}</p>
                    </div>
                </article>
            `;
        })
        .catch(error => console.log(error));
    }
};

// eslint-disable-next-line no-unused-vars
const showRandomRecipesWithInnerHTMLAndOnePageRefresh = async (numRecipes = DEFAULT_RECIPES) => {

    let recipeList = '';
    for (let index = 0; index < numRecipes; index++) {

        await fetch(`${BASE_URL}/random.php`)
        .then(response => response.json())
        .then(data => {
            data = data.meals[0];
            recipeList += `
                <article>
                    <header>
                        <h2>${data.strMeal}</h2>
                    </header>
                    <img src="${data.strMealThumb}/preview" alt="${data.strMeal}">
                    <div>
                        <p class="pill">${data.strCategory}</p>
                        <p class="pill">${data.strArea}</p>
                    </div>
                </article>
            `;
        })
        .catch(error => console.log(error));

        document.querySelector('#recipe-list').innerHTML = recipeList;
    }
};

// eslint-disable-next-line no-unused-vars
const showRandomRecipesWithCreateElement = async (numRecipes = DEFAULT_RECIPES) => {

    const fragment = document.createDocumentFragment();
    for (let index = 0; index < numRecipes; index++) {

        await fetch(`${BASE_URL}/random.php`)
        .then(response => response.json())
        .then(data => {
            data = data.meals[0];

            const h2 = document.createElement('h2');
            h2.innerText = data.strMeal;

            const header = document.createElement('header');
            header.append(h2);

            const img = document.createElement('img');
            img.setAttribute('src', `${data.strMealThumb}/preview`);
            img.setAttribute('alt', data.strMeal);

            const pCategory = document.createElement('p');
            pCategory.classList.add('pill');
            pCategory.innerText = data.strCategory;

            const pArea = document.createElement('p');
            pArea.classList.add('pill');
            pArea.innerText = data.strArea;
            
            const div = document.createElement('div');
            div.append(pCategory);
            div.append(pArea);

            const article = document.createElement('article');
            article.append(header);
            article.append(img);
            article.append(div);

            fragment.append(article);
        })
        .catch(error => console.log(error));
    }
    document.querySelector('#recipe-list').append(fragment);
};

const showRandomRecipes = async (numRecipes = DEFAULT_RECIPES) => {

    const fragment = document.createDocumentFragment();
    for (let index = 0; index < numRecipes; index++) {

        await fetch(`${BASE_URL}/random.php`)
        .then(response => response.json())
        .then(data => {
            data = data.meals[0];

            const card = document.querySelector('#recipe-card').content.cloneNode(true);

            card.querySelector('h2').innerText = data.strMeal;

            const img = card.querySelector('img');
            img.setAttribute('src', `${data.strMealThumb}/preview`);
            img.setAttribute('alt', data.strMeal);

            card.querySelector('.pill:first-of-type').innerText = data.strCategory;
            card.querySelector('.pill:last-of-type').innerText = data.strArea;

            card.querySelectorAll('a').forEach(link => {
                link.href = `recipe.htm?id=${data.idMeal}`;
            });

            fragment.append(card);
        })
        .catch(error => console.log(error));
    }
    document.querySelector('#recipe-list').append(fragment);
};

showRandomRecipes();