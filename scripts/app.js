import { RECIPES } from './data/recipes.js'
import { cardFactory } from './components/card.js'
import { filter } from './utilities/search.js'
// import { displayInputTextDropDown } from "./utilities/tags.js";
// import { displayTagList } from "./utilities/tags.js";
import ListContent from './utilities/tags.js'

export default function displayCard(RECIPES) {
  const cardSection = document.querySelector('.card_section')

  for (const recipe of RECIPES) {
    const cardModel = cardFactory(recipe)
    const cardDom = cardModel.getCardDom()
    cardSection.appendChild(cardDom)
  }
}

function init() {
  displayCard(RECIPES)
  const ingredientsClass = new ListContent('ingredients')
  const appliancesClass = new ListContent('appliances')
  const ustensilsClass = new ListContent('ustensils')

  filter(ingredientsClass, appliancesClass, ustensilsClass)
  // searchInLists(ingredientsClass, appliancesClass, ustensilsClass)
}

init()
