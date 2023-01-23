import { RECIPES } from './data/recipes.js'
import { cardFactory } from './components/card.js'
import { filter, tagSearchRecipe } from './utilities/search.js'
import ListContent from './utilities/tags.js'

export default function displayCard(RECIPES) {
  const cardSection = document.querySelector('.card_section')
  cardSection.innerHTML = ''

  for (const recipe of RECIPES) {
    const cardModel = cardFactory(recipe)
    const cardDom = cardModel.getCardDom()
    cardSection.appendChild(cardDom)
  }
}

function init() {
  displayCard(RECIPES)
  const ingredientsClass = new ListContent('ingredients', tagSearchRecipe)
  const appliancesClass = new ListContent('appliances', tagSearchRecipe)
  const ustensilsClass = new ListContent('ustensils', tagSearchRecipe)

  filter(ingredientsClass, appliancesClass, ustensilsClass)
}

init()
