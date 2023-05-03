import "./App.css";
import React from "react";
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Recipes from './pages/Recipes'
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<Homepage></Homepage>}></Route>
          <Route path="/recipes" element={<Recipes></Recipes>}></Route>
          <Route path="/preparation" element={<Homepage></Homepage>}></Route>
          <Route path="/calculator" element={<Homepage></Homepage>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
