const searchBtn = document.querySelector(".searchBtn");
const searchBox = document.querySelector(".searchBox");
const recipeContainer = document.querySelector(".recipe-container");
const recipeCloseBtn = document.querySelector(".recipe-closeBtn")
const recipeDetailsContent = document.querySelector(".recipe-details-content");

const fetchRecipe = async (query) => {

    recipeContainer.innerHTML = `<h2>Fetching your recipe please wait</h2>`

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)

    const data = await response.json();


    recipeContainer.innerHTML = ""

    data.meals.forEach(meal => {

        const recipeDiv = document.createElement('div');

        recipeDiv.classList.add('recipe');

        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            <p><span>${meal.strCategory}</span> Dish</p>
            <p>Belongs to <span>${meal.strArea}</span> Category</p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe"
        recipeDiv.appendChild(button);

        button.addEventListener('click', () => {
            openRecipePopup(meal);
        })

        recipeContainer.appendChild(recipeDiv)
    })
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
                <h2 class="recipe-name">${meal.strMeal}</h2>
                <hr class="line-meal">
                <h3>Ingrediants :</h3>
                <hr class="line-for-ingr">
                <ul>${fetchIngrediants(meal)}</ul>
                <div>
                    <h3>Instructions : </h3>
                    <hr class="line-for-ingr">
                    <p>${meal.strInstructions}</p>
                </div>
        `
    recipeDetailsContent.parentElement.style.display = "block"
}

// fetching ingrediante 

const fetchIngrediants = (meal) => {
    // console.log(meal);

    let ingredientList = ""
    for (let i = 1; i <= 20; i++) {

        const ingredient = meal[`strIngredient${i}`]

        if (ingredient) {
            const measure = meal[`strMeasure${i}`]
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break
        }
    }
    return ingredientList
}



// -----recipe close button

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none"
})


// ----------search button 


searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const searchInput = searchBox.value.trim()
    fetchRecipe(searchInput)
})
