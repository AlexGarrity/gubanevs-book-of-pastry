import React, { type ReactElement } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout (): ReactElement {
  return (
    <div className="w-screen h-screen font-serif">
      <div className="container flex flex-1 flex-col my-0 mx-auto h-screen">
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </div>
  )
}
