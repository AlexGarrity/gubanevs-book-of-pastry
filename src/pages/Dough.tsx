import React, { type Dispatch, useEffect, useState, type ReactElement } from 'react'
import Card, { CardBody, CardFooter, CardGrid, CardGridRow, CardHeader } from '../components/Card'
import CalculateSHC from '../lib/CalculateSHC'

import { type DoughsRoot, type DoughDefinition, type ShcRatio } from '../lib/Dough'

function parseShcRatio (json: ShcRatio): string {
  const flour = (json.flour != null) ? json.flour : 0
  const butter = (json.butter != null) ? json.butter : 0
  const oil = (json.oil != null) ? json.oil : 0
  const water = (json.water != null) ? json.water : 0

  return CalculateSHC({ flour, butter, oil, water })
}

function DoughCard (dough: DoughDefinition): ReactElement {
  return (
    <Card key={dough.name}>
      <CardHeader>
        <h1>{dough.name}</h1>
      </CardHeader>
      <CardBody>
        {dough.description.map((value: string, index: number) => {
          return (
            <p key={'d' + dough.name + index.toString()}>{value}</p>
          )
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
  )
}

export default function Dough (): ReactElement {
  const [state, setState]: [state: DoughsRoot | undefined, setState: Dispatch<DoughsRoot | undefined>] = useState()
  const SEVEN_DAYS_IN_MS = 6.048e8

  useEffect(() => {
    async function updateLocalDoughs (): Promise<void> {
      const fetchPromise = await fetch(
        'https://raw.githubusercontent.com/AlexGarrity/gubanevs-book-of-pastry/master/src/assets/doughs.json'
      )

      const doughs: DoughsRoot = await fetchPromise.json()

      localStorage.setItem('doughs', JSON.stringify(doughs))
      localStorage.setItem(
        'doughs_expiry',
        (Date.now() + SEVEN_DAYS_IN_MS).toString()
      )
    }

    async function getDoughs (): Promise<DoughsRoot> {
      if (!('doughs' in localStorage)) {
        await updateLocalDoughs()
      }
      const doughsExpiry = localStorage.getItem('doughs_expiry')
      if (doughsExpiry == null) {
        return {
          version: 0,
          doughs: []
        }
      }

      if (Number.parseInt(doughsExpiry) < Date.now()) {
        await updateLocalDoughs()
      }

      const doughsJson = localStorage.getItem('doughs')
      if (doughsJson == null) {
        return {
          version: 0,
          doughs: []
        }
      }
      const doughs: DoughsRoot = JSON.parse(doughsJson)
      return doughs
    }

    getDoughs().then((newState) => {
      if (newState == null) return

      if (state == null) {
        setState(newState)
        return
      }

      if (newState.version > state.version) {
        setState(newState)
      }
    }
    ).catch(() => {
      console.log('Something went wrong when trying to retrieve doughs')
    })
  }, [state]
  )

  return (
    <div id="dough-gallery" className="flex flex-row flex-wrap justify-between mx-auto w-3/4">
      {(state != null)
        ? state.doughs.map((value: DoughDefinition) => {
          return DoughCard(value)
        })
        : <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
      }
    </div>
  )
}
