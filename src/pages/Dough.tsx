import React, { Dispatch, useEffect, useState } from "react";
import Card, { CardBody, CardFooter, CardGrid, CardGridRow, CardHeader } from '../components/Card'
import CalculateSHC from '../lib/CalculateSHC'

import { DoughsRoot, DoughDefinition, ShcRatio } from '../lib/Dough'

function parseShcRatio(json: ShcRatio): string {
  const flour = json.flour ? json.flour : 0;
  const butter = json.butter ? json.butter : 0;
  const oil = json.oil ? json.oil : 0;
  const water = json.water ? json.water : 0;

  return CalculateSHC({ flour: flour, butter: butter, oil: oil, water: water })
}

function DoughCard(dough: DoughDefinition) {
  return (
    <Card key={dough.name}>
      <CardHeader>
        <h1>{dough.name}</h1>
      </CardHeader>
      <CardBody>
        {dough.description.map((value: string, index: number) => {
          return (
            <p key={"d" + dough.name + index.toString()}>{value}</p>
          );
        })}
      </CardBody>
      <CardFooter>
        <CardGrid>
          <CardGridRow>
            <p>Estimated SHC</p>
            <p>{parseShcRatio(dough.stats.shc_ratio)} J/gK</p>
          </CardGridRow>
          <CardGridRow>
            <p>Target Temperature</p>
            <p>{dough.stats.target_temperature}&deg;C</p>
          </CardGridRow>
          <CardGridRow>
            <p>Difficulty Class</p>
            <p>DC {dough.stats.difficulty_class}</p>
          </CardGridRow>
        </CardGrid>
      </CardFooter>
    </Card>
  );
}

export default function Dough() {

  const [state, setState]: [state: DoughsRoot, setState: Dispatch<DoughsRoot>] = useState();
  const SEVEN_DAYS_IN_MS = 6.048e8;

  useEffect(() => {
    async function updateLocalDoughs() {
      const fetchPromise = await fetch(
        "https://raw.githubusercontent.com/AlexGarrity/gubanevs-book-of-pastry/master/src/assets/doughs.json"
      );

      const doughs: DoughsRoot = await fetchPromise.json();

      localStorage.setItem("doughs", JSON.stringify(doughs));
      localStorage.setItem(
        "doughs_expiry",
        (Date.now() + SEVEN_DAYS_IN_MS).toString()
      );
    }

    async function getDoughs() {
      if (!("doughs" in localStorage)) {
        await updateLocalDoughs();
      } else if (
        Number.parseInt(localStorage.getItem("doughs_expiry")) < Date.now()
      ) {
        await updateLocalDoughs();
      }

      const doughs: DoughsRoot = JSON.parse(localStorage.getItem("doughs"));
      return doughs;
    }

    getDoughs().then((newState) => {
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
    <div id="dough-gallery" className="flex flex-row flex-wrap justify-between mx-auto w-3/4">
      {(state) ?
        state.map((value: DoughDefinition) => {
          if (value.version) {
            return;
          }
          return DoughCard(value)
        })
        :
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
        </svg>
      }
    </div>
  );
}
