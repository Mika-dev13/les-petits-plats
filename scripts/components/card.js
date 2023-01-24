export function cardFactory(data) {
  const { name, time, description, ingredients } = data

  function getCardDom() {
    const article = document.createElement('article')
    article.classList.add('col-4')

    const divCard = document.createElement('div')
    divCard.classList.add('card')

    const imgCard = document.createElement('img')
    imgCard.setAttribute('src', '/assets/dummy_600x400_ffffff_cccccc.png')
    imgCard.setAttribute('alt', 'plats')
    imgCard.classList.add('card-img-top')

    const divCardBody = document.createElement('div')
    divCardBody.classList.add('card-body', 'd-flex-column', 'bg-light')

    const divCardTitle = document.createElement('div')
    divCardTitle.classList.add(
      'card-title',
      'd-flex',
      'justify-content-between'
    )

    const titleRecipe = document.createElement('p')
    titleRecipe.classList.add('col-6', 'pt-2', 'recipe-title')
    titleRecipe.textContent = `${name}`

    const divClock = document.createElement('div')
    divClock.classList.add('clock', 'd-flex', 'align-items-center')

    const imgClock = document.createElement('img')
    imgClock.setAttribute('src', '/assets/clock.svg')
    imgClock.setAttribute('alt', 'horloge')

    const timeText = document.createElement('span')
    timeText.classList.add('mb-0', 'ps-2', 'fw-bold')
    timeText.textContent = `${time} mn`

    const divCardText = document.createElement('div')
    divCardText.classList.add('card-text')

    const divRecipeContainer = document.createElement('div')
    divRecipeContainer.classList.add('d-flex', 'justify-content-between')

    const divRecipeIngredients = document.createElement('div')
    divRecipeIngredients.classList.add('col-6', 'recipe-ingredients', 'pe-2')

    //Ajouter les ingredients
    const listIngredient = this.getListIngredients()
    divRecipeIngredients.appendChild(listIngredient)

    const divRecipeDescription = document.createElement('div')
    divRecipeDescription.classList.add('col-6', 'recipe-description')
    const paragraphDescription = document.createElement('p')
    paragraphDescription.classList.add('paragraph_description')
    paragraphDescription.textContent = `${description}`

    divRecipeDescription.appendChild(paragraphDescription)
    divRecipeContainer.appendChild(divRecipeIngredients)
    divRecipeContainer.appendChild(divRecipeDescription)
    divCardText.appendChild(divRecipeContainer)
    divCard.appendChild(imgCard)
    divClock.appendChild(imgClock)
    divClock.appendChild(timeText)
    divCardTitle.appendChild(titleRecipe)
    divCardTitle.appendChild(divClock)
    divCardBody.appendChild(divCardTitle)
    divCardBody.appendChild(divCardText)
    divCard.appendChild(divCardBody)
    article.appendChild(divCard)

    return article
  }

  function getListIngredients() {
    let ingredientText = []
    const listIgredient = document.createElement('ul')
    listIgredient.classList.add('ps-0', 'ingredients_list')

    for (let i = 0; i < ingredients.length; i++) {
      let ingredient = ingredients[i].ingredient
      let quantity = ingredients[i].quantity
      let unit = ingredients[i].unit

      if (!quantity && !unit) {
        ingredientText.push(`<li><strong>${ingredient}</strong></li>`)
      } else if (quantity && !unit) {
        ingredientText.push(
          `<li><strong>${ingredient}:</strong> ${quantity}</li>`
        )
      } else if (unit) {
        ingredientText.push(
          `<li><strong>${ingredient}:</strong> ${quantity} ${unit}</li>`
        )
      }
    }

    listIgredient.innerHTML = `${ingredientText.join('')}`

    return listIgredient
  }

  return { getCardDom, getListIngredients }
}
