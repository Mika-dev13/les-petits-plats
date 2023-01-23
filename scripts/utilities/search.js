import { RECIPES } from '../data/recipes.js'
import displayCard from '../app.js'
import ListContent from './tags.js'

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

// Suprime les accents
function toFormatString(str) {
  let strNormal = str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
  return strNormal
}

function search(value) {
  let newTabRecipes = []

  if (value) {
    RECIPES.forEach((recipe) => {
      const recipeName = recipe.name.toLowerCase()
      const recipeDescription = recipe.description.toLowerCase()
      const recipeIngredients = JSON.stringify(recipe.ingredients).toLowerCase()

      if (
        recipeName.includes(value) ||
        recipeDescription.includes(value) ||
        recipeIngredients.includes(value)
      ) {
        newTabRecipes.push(recipe)
      }
    })
  } else {
    newTabRecipes = RECIPES
  }

  const tagsIngredient = document.querySelectorAll('.tag-container .bg-primary')
  const tagsAppliance = document.querySelectorAll('.tag-container .bg-danger')
  const tagsUstensil = document.querySelectorAll('.tag-container .bg-success')

  //INGREDIENT
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

  //APPAREIL
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

  //USTENSIL
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

export function tagSearchRecipe() {
  const searchBar = document.getElementById('search-input')
  const userInput = toFormatString(searchBar.value)
  const newRecipes = search(userInput)

  const ingredientsClass = new ListContent('ingredients', tagSearchRecipe)
  const appliancesClass = new ListContent('appliances', tagSearchRecipe)
  const ustensilsClass = new ListContent('ustensils', tagSearchRecipe)

  renderSearch(newRecipes, ingredientsClass, appliancesClass, ustensilsClass)
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
