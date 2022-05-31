import { RECIPES } from "../data/recipes.js";


export function displayTextDropDown() {
    const textDropDown = document.querySelector(".search-tag-content");
    const inputDropDown = document.querySelector(".input-search-filter");

    inputDropDown.addEventListener("input", () => {
        
        textDropDown.classList.add("d-none") 
        if(!inputDropDown.value) textDropDown.classList.remove("d-none")
        
    })
}



export function getDropDownIngredient() {
    const tagLIst = document.querySelector(".tag-list");

    let ingredientArray = [];
    let ingredientArrayFiltered =[]

    function toStrUppercase(str) {
        
        // Suprime les accents
        let strNormal = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        return strNormal.charAt(0).toUpperCase() + strNormal.substring(1).toLocaleLowerCase()
    }

    function createTagList() {

        // Supprime les mots en double
        ingredientArrayFiltered = [...new Set(ingredientArray)]
        // Trie le tableau par ordre alphabetique
        ingredientArrayFiltered.sort()
        
        for(let elem of ingredientArrayFiltered) {
            const tagListElement = document.createElement('li');
            tagListElement.textContent = elem
            tagLIst.appendChild(tagListElement);
        }
    }

    function displayTagList() {
        for( let recipe of RECIPES) {

            for (let ingredient of recipe.ingredients) {

                let strIngredient = ingredient.ingredient;
                let strUppercase = toStrUppercase(strIngredient);
                ingredientArray.push(strUppercase)                            
            } 
        }
    }

        displayTagList()
        createTagList()
    
}

