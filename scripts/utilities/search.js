import { RECIPES } from "../data/recipes.js";

export function filter() {

    const searchBar = document.getElementById("search-input")
    const recipeTitle = document.getElementsByTagName("h6");
    const recipeDescription = document.getElementsByTagName("p")

    searchBar.addEventListener("input", () => {

        const searchBarInput = searchBar.value.toUpperCase();
        const searchBarInputCount = searchBarInput.length >=3 ? searchBarInput : null;
        const article = document.getElementsByTagName("article");

        for(let i = 0; i < RECIPES.length; i++) {
            
            const recipeTitleText = recipeTitle[i].innerText.toUpperCase();
            const recipeDescriptionText = recipeDescription[i].innerText.toUpperCase();
            const recipeIngredientText = JSON.stringify(RECIPES[i].ingredients).toUpperCase();
            
            if(searchBarInputCount) {
                
                if(recipeTitleText.indexOf(searchBarInput) > -1 || recipeDescriptionText.indexOf(searchBarInput) > -1 || recipeIngredientText.indexOf(searchBarInput) > -1) {
                    
                    article[i].style.display = "";
                } else {
                    article[i].style.display = "none";
                }
            }
            if(searchBarInput.length === 0) {
                article[i].style.display = "";
            }
        }
    });
}

// export function filter() {
//     const article = document.getElementsByTagName("article");
//     const searchBar = document.getElementById("search-input")
    
//     searchBar.addEventListener("input", () => {
        
//         const searchBarInput = searchBar.value.toUpperCase();
//         const searchBarInputCount = searchBarInput.length >=3 ? searchBarInput : null;

//         RECIPES.forEach((recipe, index) => {
//             const recipeTitleText = recipe.name.toLocaleUpperCase();
//             const recipeDescriptionText = recipe.description.toUpperCase();
//             const recipeIngredientText = JSON.stringify(recipe.ingredients).toUpperCase();
            
//             if(searchBarInputCount) {
                
//                 if(recipeTitleText.indexOf(searchBarInput) > -1 || recipeDescriptionText.indexOf(searchBarInput) > -1 || recipeIngredientText.indexOf(searchBarInput) > -1) {
//                     console.log(recipeTitleText)
//                     article[index].style.display = "";
//                 } else {
//                     article[index].style.display = "none";
//                 }  
                
//                 if(searchBarInput.length === 0) {
//                     article[index].style.display = "";
//                 }
//             }
//         })
//     });
// }

