import React from "react";
import GubanevQuote from "../components/GubanevQuote";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <GubanevQuote></GubanevQuote>
      <div
        id="body"
        className="flex p-32 justify-center align-middle space-x-16"
      >
        <Link to="/recipes" className="border border-gray-600 border-solid p-8 flex flex-1 flex-col">
          <h3 className="text-2xl">Recipes</h3>
          <p>Browse recipes, including timings, equipment and ingredients</p>
        </Link>
        <Link to="/dough" className="border border-gray-600 border-solid p-8 flex flex-1 flex-col">
          <h3 className="text-2xl">Dough Types</h3>
          <p>Review the in-game complexity of various doughs</p>
        </Link>
        <Link to="/calculator" className="border border-gray-600 border-solid p-8 flex flex-1 flex-col">
          <h3 className="text-2xl">Calculator</h3>
          <p>
            Calculate how well cooked a pastry is
          </p>
        </Link>
      </div>
    </>
  );
}
