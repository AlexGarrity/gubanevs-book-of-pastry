import './App.css'
import React, { type ReactElement } from 'react'
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import Calculator from './pages/Calculator'
import Dough from './pages/Dough'
import Recipes from './pages/Recipes'
import { HashRouter, Route, Routes } from 'react-router-dom'

export default function App (): ReactElement {
  return (
    <HashRouter basename={''}>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Homepage />}></Route>
          <Route path={'/dough'} element={<Dough />}></Route>
          <Route path={'/recipes'} element={<Recipes />}></Route>
          <Route path={'/calculator'} element={<Calculator />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}
