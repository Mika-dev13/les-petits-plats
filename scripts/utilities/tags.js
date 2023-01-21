import { RECIPES } from '../data/recipes.js'

export default class ListContent {
  constructor(nameTag, TagSearchRecipe) {
    this.dropDownContainer = document.getElementById(nameTag)
    this.tagList = document.querySelector(`#${nameTag} ul`)
    this.searchTagContent = document.querySelector(
      `#${nameTag} .search-tag-content`
    )
    this.inputDropDown = document.querySelector(
      `#${nameTag} .input-search-filter`
    )
    this.textDropDown = document.querySelector(
      `#${nameTag} .text-search-filter`
    )
    this.iconDropDown = document.querySelector(`#${nameTag} i`)
    this.TagSearchRecipe = TagSearchRecipe

    this.nameTag = nameTag
    this.dataList = []
    this.liTexContent = ''
    this.colorTag = ''
    this.init(RECIPES)
  }

  init(recipes) {
    this.getData(recipes)
    this.render(this.dataList)
    this.selectTagInList()
    this.displayList()
    this.closeTagListWithChevron()
    this.searchInTag()
  }

  updateTag(tagsList) {
    this.render(tagsList)
    this.selectTagInList()
    this.displayList()
  }

  getData(recipes) {
    switch (this.nameTag) {
      case 'ingredients':
        this.dataList = this.dataIngredientList(recipes)
        this.colorTag = 'bg-primary'
        break

      case 'appliances':
        this.dataList = this.dataApplianceList(recipes)
        this.colorTag = 'bg-danger'
        break

      case 'ustensils':
        this.dataList = this.dataUstensilList(recipes)
        this.colorTag = 'bg-success'
        break

      default:
        this.dataList = this.dataIngredientList(recipes)
        this.colorTag = 'bg-primary'
        break
    }
  }

  searchInTag() {
    this.inputDropDown.addEventListener('input', (e) => {
      let newTabIngredients = []
      const userIngredientsInput = e.target.value.trim().toLowerCase()
      console.log(userIngredientsInput)

      for (const tag of this.dataList) {
        let tagTest = tag.toLowerCase()
        if (tagTest.includes(userIngredientsInput)) {
          newTabIngredients.push(tag)
        }
      }

      this.updateTag(newTabIngredients)
    })
  }

  dataIngredientList(recipesList) {
    let arrayIngredient = []
    for (let recipe of recipesList) {
      for (let ingredient of recipe.ingredients) {
        let strIngredient = ingredient.ingredient
        let strIngredientUppercase = this.toFormatString(strIngredient)
        arrayIngredient.push(strIngredientUppercase)
      }
    }
    let arrayIngredientFiltered = [...new Set(arrayIngredient)]
    return arrayIngredientFiltered.sort()
  }

  dataApplianceList(recipesList) {
    let arrayAppliance = []
    for (let recipe of recipesList) {
      let strAppliance = recipe.appliance
      let strApplianceUppercase = this.toFormatString(strAppliance)
      arrayAppliance.push(strApplianceUppercase)
    }
    let arrayApplianceFiltered = [...new Set(arrayAppliance)]
    return arrayApplianceFiltered.sort()
  }

  dataUstensilList(recipesList) {
    let arrayUstensil = []
    for (let recipe of recipesList) {
      for (let ustensil of recipe.ustensils) {
        let strUstensilUppercase = this.toFormatString(ustensil)

        arrayUstensil.push(strUstensilUppercase)
      }
    }
    let arrayUstensilFiltered = [...new Set(arrayUstensil)]
    return arrayUstensilFiltered.sort()
  }

  toFormatString(str) {
    // Suprime les accents
    let strNormal = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return (
      strNormal.charAt(0).toUpperCase() +
      strNormal.substring(1).toLocaleLowerCase()
    )
  }

  render(tagsList) {
    this.tagList.innerHTML = ''
    for (let elem of tagsList) {
      const tagListElement = document.createElement('li')
      tagListElement.textContent = elem
      this.tagList.appendChild(tagListElement)
    }
  }

  displayList() {
    this.searchTagContent.addEventListener('click', (e) => {
      e.preventDefault()

      this.curentElement = e.currentTarget

      if (
        this.tagList.getAttribute('data-state') === 'open' &&
        this.searchTagContent !== this.curentElement
      ) {
        this.closeList()
      } else {
        this.openList()
      }
    })
  }

  openList() {
    this.tagList.classList.remove('d-none')
    this.tagList.setAttribute('data-state', 'open')
    this.searchTagContent.classList.add('clicked')
    this.dropDownContainer.style.width = '100%'
    this.iconDropDown.classList.add('bi', 'bi-chevron-up')
    this.iconDropDown.classList.remove('bi', 'bi-chevron-down')
    this.inputDropDown.classList.remove('d-none')
    this.textDropDown.classList.add('d-none')
  }

  closeList() {
    this.tagList.classList.add('d-none')
    this.tagList.setAttribute('data-state', 'close')
    this.searchTagContent.classList.remove('clicked')
    this.dropDownContainer.style.width = '170px'
    this.inputDropDown.classList.add('d-none')
    this.textDropDown.classList.remove('d-none')
    this.iconDropDown.classList.remove('bi', 'bi-chevron-up')
    this.iconDropDown.classList.add('bi', 'bi-chevron-down')
  }

  closeTagListWithChevron() {
    this.iconDropDown.addEventListener('click', (e) => {
      e.stopPropagation()
      if (Array.from(this.iconDropDown.classList).includes('bi-chevron-up')) {
        this.closeList()
      } else {
        this.openList()
      }
    })
  }

  selectTagInList() {
    let allLiTagList = document.querySelectorAll(
      `#${this.nameTag} .tag-list li`
    )
    allLiTagList.forEach((element) => {
      element.addEventListener('click', (e) => {
        this.tagTextContent = e.target.textContent
        this.tagBuilderHtml()

        this.TagSearchRecipe()
      })
    })
  }

  tagBuilderHtml() {
    const tagContainer = document.querySelector('.tag-container')
    const divTag = document.createElement('div')
    divTag.classList.add(
      this.colorTag,
      'rounded',
      'px-3',
      'py-2',
      'me-3',
      'mt-4',
      'tag-content'
    )
    tagContainer.appendChild(divTag)

    const spanTag = document.createElement('span')
    spanTag.classList.add('text-white', 'fs-6', 'me-3')
    spanTag.textContent = this.tagTextContent
    divTag.appendChild(spanTag)

    const iconTag = document.createElement('i')
    iconTag.classList.add('bi', 'bi-x-circle', 'text-white')
    divTag.appendChild(iconTag)

    const article = document.getElementsByTagName('article')
    // fermeture des tags
    iconTag.addEventListener('click', () => {
      divTag.remove()
      this.TagSearchRecipe()
      Array.from(article).forEach((elem) => (elem.style.display = ''))
    })
  }
}
