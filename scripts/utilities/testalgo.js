function search(value) {
  let newTabRecipes = []

  if (value) {
    for (const recipe of RECIPES) {
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
    }
  } else {
    newTabRecipes = RECIPES
  }

  return newTabRecipes
}

search('coco')

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

  return newTabRecipes
}

search('coco')
