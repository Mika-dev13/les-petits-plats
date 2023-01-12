import { RECIPES } from '../data/recipes.js'
import displayCard from '../app.js'

const searchBar = document.getElementById('search-input')
const cardSection = document.querySelector('.card_section')

export function filter(ingredientsClass, appliancesClass, ustensilsClass) {
  searchBar.addEventListener('input', () => {
    // let newTabRecipes = []

    const userInput = searchBar.value.toLowerCase()
    const userInputCount = userInput.length >= 3 ? userInput : null

    if (userInputCount) {
      // seach()
      // render()
      // for (let i = 0; i < RECIPES.length; i++) {
      //   const recipeName = RECIPES[i].name.toLowerCase()
      //   const recipeDescription = RECIPES[i].description.toLowerCase()
      //   const recipeIngredients = JSON.stringify(
      //     RECIPES[i].ingredients
      //   ).toLowerCase()
      //   if (
      //     recipeName.includes(userInput) ||
      //     recipeDescription.includes(userInput) ||
      //     recipeIngredients.includes(userInput)
      //   ) {
      //     newTabRecipes.push(RECIPES[i])
      //   }
      // }

      console.log(search(userInput))

      ingredientsClass.init(search())
      appliancesClass.init(search())
      ustensilsClass.init(search())
      cardSection.innerHTML = ''
      displayCard(newTabRecipes)
    } else {
      ingredientsClass.init(RECIPES)
      appliancesClass.init(RECIPES)
      ustensilsClass.init(RECIPES)
      displayCard(RECIPES)
    }
  })
}

function search(input) {
  let newTabRecipes = []
  for (let i = 0; i < RECIPES.length; i++) {
    const recipeName = RECIPES[i].name.toLowerCase()
    const recipeDescription = RECIPES[i].description.toLowerCase()
    const recipeIngredients = JSON.stringify(
      RECIPES[i].ingredients
    ).toLowerCase()
    if (
      recipeName.includes(input) ||
      recipeDescription.includes(input) ||
      recipeIngredients.includes(input)
    ) {
      newTabRecipes.push(RECIPES[i])
    }
  }
}
//InputSearch() event input ( search() et render() )
//TagSearchRecipe() envent add tag au click  ( récupére les tag + search() et render() )

//Search() de recherche seul qui n'est pas déclanché par un evenement (Input + tag)
// for (let i = 0; i < RECIPES.length; i++) {
//     const recipeName = RECIPES[i].name.toLowerCase()
//     const recipeDescription = RECIPES[i].description.toLowerCase()
//     const recipeIngredients = JSON.stringify(
//       RECIPES[i].ingredients
//     ).toLowerCase()
//     if (
//       recipeName.includes(userInput) ||
//       recipeDescription.includes(userInput) ||
//       recipeIngredients.includes(userInput)
//     ) {
//       newTabRecipes.push(RECIPES[i])
//     }

//Fillter TAg (Recuepre les tag via HTML)
//Cho 10 -> 5
//banane 5 -> 1 ou 0
//   }

//Render(newTabRecipes) Affichage (update list tag et recep)
//   ingredientsClass.init(newTabRecipes)
//   appliancesClass.init(newTabRecipes)
//   ustensilsClass.init(newTabRecipes)
//   cardSection.innerHTML = ''
//   displayCard(newTabRecipes)
// } else {
//   ingredientsClass.init(RECIPES)
//   appliancesClass.init(RECIPES)
//   ustensilsClass.init(RECIPES)
//   displayCard(RECIPES)

// export function searchInLists(
//   ingredientsClass,
//   appliancesClass,
//   ustensilsClass
// ) {
//   const ingredientsListInput = document.querySelector(`#ingredients-input`)
//   const ingredientsList = ingredientsClass.dataIngredientList(RECIPES)

//   console.log(ingredientsList)

//   ingredientsListInput.addEventListener('input', (e) => {
//     let newTabIngredients = []
//     const userIngredientsInput = e.target.value

//     for (let i = 0; i < ingredientsList.length; i++) {
//       if (ingredientsList[i].includes(userIngredientsInput)) {
//         newTabIngredients.push(ingredientsList[i])
//       }
//     }
//     console.log(newTabIngredients)
//     ingredientsClass.updateList(newTabIngredients)
//   })
// }
