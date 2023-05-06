import React, { type Dispatch, useEffect, useState, type ReactElement } from 'react'

import Card, { CardBody, CardFooter, CardGrid, CardGridRow, CardHeader } from '../components/Card'

import { type Recipe, type RecipeRoot } from '../lib/Recipe'
import { Link } from 'react-router-dom'

function RecipeCard (recipe: Recipe): ReactElement {
  return (
    <Link to={'/calculator?shc_food=' + recipe.stats.shc.toString() + '&mass=' + recipe.stats.mass.toString() + '&target_temperature=' + recipe.stats.temperature.toString()}>
      <Card key={recipe.name}>
        <CardHeader>
          <h1>{recipe.name}</h1>
        </CardHeader>
        <CardBody>
          <p>{recipe.description}</p>
        </CardBody>
        <CardFooter>
          <h1 className="text-lg font-bold mb-3">Ingredients</h1>
          <CardGrid>
            {recipe.ingredients.map((value: string[], index: number) => {
              return (
                <CardGridRow key={'ir' + index.toString()}>
                  <p key={'i' + recipe.name + index.toString() + '1'}>{value[0]}</p>
                  <p key={'i' + recipe.name + index.toString() + '2'}>{value[1]}</p>
                </CardGridRow>
              )
            })}
          </CardGrid>
          <h1 className="text-lg font-bold mb-3">Preparation</h1>
          <CardGrid>
            {recipe.preparation.map((value: string[], index: number) => {
              return (
                <CardGridRow key={'pr' + index.toString()}>
                  <p key={'p' + recipe.name + index.toString() + '1'}>{value[0]}</p>
                  <p key={'p' + recipe.name + index.toString() + '2'}>{value[1]}</p>
                </CardGridRow>
              )
            })}
          </CardGrid>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default function Recipes (): ReactElement {
  const [state, setState]: [state: RecipeRoot | undefined, setState: Dispatch<RecipeRoot | undefined>] = useState()

  const SEVEN_DAYS_IN_MS = 6.048e8

  useEffect(() => {
    async function updateLocalRecipes (): Promise<void> {
      const fetchPromise = await fetch(
        'https://raw.githubusercontent.com/AlexGarrity/gubanevs-book-of-pastry/master/src/assets/recipes.json'
      )

      const recipes: RecipeRoot = await fetchPromise.json()

      localStorage.setItem('recipes', JSON.stringify(recipes))
      localStorage.setItem(
        'recipes_expiry',
        (Date.now() + SEVEN_DAYS_IN_MS).toString()
      )
    }

    async function getRecipes (): Promise<RecipeRoot> {
      if (!('recipes' in localStorage)) {
        await updateLocalRecipes()
      }

      const recipesExpiry = localStorage.getItem('recipes_expiry')
      if (recipesExpiry == null) {
        return {
          version: 0,
          recipes: []
        }
      }

      if (Number.parseInt(recipesExpiry) < Date.now()
      ) {
        await updateLocalRecipes()
      }

      const recipesJson = localStorage.getItem('recipes')
      if (recipesJson == null) {
        return {
          version: 0,
          recipes: []
        }
      }

      const recipes: RecipeRoot = JSON.parse(recipesJson)
      return recipes
    }

    getRecipes().then((newState: RecipeRoot) => {
      if (newState == null) return

      if (state == null) {
        setState(newState)
        return
      }

      if (newState.version > state.version) {
        setState(newState)
      }
    }).catch(() => {
      console.log('Something went wrong when trying to retrieve recipe data')
    })
  }, [state]
  )

  return (
    <div className="flex flex-row flex-wrap space-x-8">
      {(state != null)
        ? state.recipes.map((value: Recipe) => {
          return RecipeCard(value)
        })
        : <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      }
    </div>
  )
}
