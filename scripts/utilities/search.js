import { RECIPES } from '../data/recipes.js'
import displayCard from '../app.js'

const searchBar = document.getElementById('search-input')
const alert = document.querySelector('.alert')

export function filter(ingredientsClass, appliancesClass, ustensilsClass) {
  searchBar.addEventListener('input', () => {
    const userInput = toFormatString(searchBar.value)
    const userInputCount = userInput.length >= 3 ? userInput : null

    if (userInputCount) {
      const newTabRecipes = search(userInput)

      renderSearch(
        newTabRecipes,
        ingredientsClass,
        appliancesClass,
        ustensilsClass
      )
    } else {
      const newTabRecipes = search()
      renderSearch(
        newTabRecipes,
        ingredientsClass,
        appliancesClass,
        ustensilsClass
      )
    }
  })
}

function toFormatString(str) {
  // Suprime les accents
  let strNormal = str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
  return strNormal
}

function search(value) {
  let newTabRecipes = []

  if (value) {
    // RECIPES.forEach(recipe => {

    // });
    for (const recipe of RECIPES) {
      const recipeName = toFormatString(recipe.name)
      const recipeDescription = toFormatString(recipe.description)
      const recipeIngredients = toFormatString(
        JSON.stringify(recipe.ingredients)
      )
      console.log(recipeIngredients)
      if (
        recipeName.includes(value) ||
        recipeDescription.includes(value) ||
        recipeIngredients.includes(value)
      ) {
        newTabRecipes.push(recipe)
      }
    }
  } else {
    newTabRecipes = RECIPES
  }

  const tagsIngredient = document.querySelectorAll('.tag-container .bg-primary')
  const tagsAppliance = document.querySelectorAll('.tag-container .bg-danger')
  const tagsUstensil = document.querySelectorAll('.tag-container .bg-success')

  if (tagsIngredient.length > 0) {
    tagsIngredient.forEach((tag) => {
      tag = tag.querySelector('span').textContent
      let newTagTab = []
      for (const recipe of newTabRecipes) {
        for (let ingredient of recipe.ingredients) {
          let strIngredient = toFormatString(ingredient.ingredient)
          if (
            !newTagTab.includes(recipe) &&
            strIngredient === toFormatString(tag)
          ) {
            newTagTab.push(recipe)
          }
        }
      }

      newTabRecipes = newTagTab
    })
  }

  //APPREIL
  if (tagsAppliance.length > 0) {
    tagsAppliance.forEach((tag) => {
      tag = tag.querySelector('span').textContent

      let newTagTab = []
      for (const recipe of newTabRecipes) {
        let strAppliance = toFormatString(recipe.appliance)
        if (
          !newTagTab.includes(recipe) &&
          strAppliance === toFormatString(tag)
        ) {
          newTagTab.push(recipe)
        }
      }
      newTabRecipes = newTagTab
    })
  }

  //USTENSIEL
  if (tagsUstensil.length > 0) {
    tagsUstensil.forEach((tag) => {
      tag = tag.querySelector('span').textContent

      let newTagTab = []
      for (const recipe of newTabRecipes) {
        for (let ustensil of recipe.ustensils) {
          let strUstensil = toFormatString(ustensil)
          if (
            !newTagTab.includes(recipe) &&
            strUstensil === toFormatString(tag)
          ) {
            newTagTab.push(recipe)
          }
        }
      }
      newTabRecipes = newTagTab
    })
  }

  return newTabRecipes
}

export function TagSearchRecipe() {
  const searchBar = document.getElementById('search-input')
  const userInput = toFormatString(searchBar.value)
  const newRecipes = search(userInput)

  displayCard(newRecipes)
}

function renderSearch(
  recipes,
  ingredientsClass,
  appliancesClass,
  ustensilsClass
) {
  ingredientsClass.init(recipes)
  appliancesClass.init(recipes)
  ustensilsClass.init(recipes)
  if (recipes.length > 0) {
    displayCard(recipes)
    alert.classList.add('d-none')
  } else {
    alert.classList.remove('d-none')
    displayCard(recipes)
  }
}
