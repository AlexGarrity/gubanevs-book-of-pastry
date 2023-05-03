import React from "react";
import Header from './Header'
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="w-screen h-screen">
      <div className="container flex flex-1 flex-col p-4 mx-auto h-screen">
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
