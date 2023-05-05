import React, { Dispatch, useEffect, useState } from "react";

import Card, { CardBody, CardFooter, CardGrid, CardGridRow, CardHeader } from "../components/Card";

import { Recipe, RecipeList } from '../lib/Recipe'

function RecipeCard(recipe: Recipe) {
  return (
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
              <CardGridRow key={"ir" + index.toString()}>
                <p key={"i" + recipe.name + index.toString() + "1"}>{value[0]}</p>
                <p key={"i" + recipe.name + index.toString() + "2"}>{value[1]}</p>
              </CardGridRow>
            );
          })}
        </CardGrid>
        <h1 className="text-lg font-bold mb-3">Preparation</h1>
        <CardGrid>
          {recipe.preparation.map((value: string[], index: number,) => {
            return (
              <CardGridRow key={"pr" + index.toString()}>
                <p key={"p" + recipe.name + index.toString() + "1"}>{value[0]}</p>
                <p key={"p" + recipe.name + index.toString() + "2"}>{value[1]}</p>
              </CardGridRow>
            );
          })}
        </CardGrid>
      </CardFooter>
    </Card>
  );
}

export default function Recipes() {

  const [state, setState]: [state: RecipeList, setState: Dispatch<RecipeList>] = useState([]);
  const SEVEN_DAYS_IN_MS = 6.048e8;

  useEffect(() => {
    async function updateLocalRecipes() {
      const fetchPromise = await fetch(
        "https://raw.githubusercontent.com/AlexGarrity/gubanevs-book-of-pastry/master/src/assets/recipes.json"
      );

      const recipes: RecipeList = await fetchPromise.json();

      localStorage.setItem("recipes", JSON.stringify(recipes));
      localStorage.setItem(
        "recipes_expiry",
        (Date.now() + SEVEN_DAYS_IN_MS).toString()
      );
    }

    async function getRecipes() {
      if (!("recipes" in localStorage)) {
        await updateLocalRecipes();
      } else if (
        Number.parseInt(localStorage.getItem("recipes_expiry")) < Date.now()
      ) {
        await updateLocalRecipes();
      }

      const recipes: RecipeList = JSON.parse(localStorage.getItem("recipes"));
      return recipes;
    }

    getRecipes().then((newState: RecipeList) => {
      if (!newState) return;

      if (!state) {
        setState(newState);
        return;
      }

      if (newState.length != state.length) {
        setState(newState);
        return;
      }

      if (newState.length < 1 || state.length < 1) {
        return;
      }

      if (newState[0].version > state[0].version)
        setState(newState)

    });
  }, [state]
  );

  return (
    <div className="flex flex-row flex-wrap space-x-8">
      {(state) ?
        state.map((value: Recipe) => {
          if (value.version) {
            return;
          }
          return RecipeCard(value)
        })
        :
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        </svg>
      }
    </div>
  );
}