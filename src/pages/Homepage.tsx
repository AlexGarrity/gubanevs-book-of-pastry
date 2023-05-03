import React from "react";
import GubanevQuote from "../components/GubanevQuote";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <>
      <GubanevQuote></GubanevQuote>
      <div
        id="body"
        className="flex flex-1 flex-row space-x-5 justify-center items-center"
      >
        <Link to="/recipes" className="border border-gray-600 border-solid p-8">
          <h3 className="text-2xl">Recipes</h3>
          <p>Browse recipes, including timings, equipment and ingredients</p>
        </Link>
        <Link to="/preparation" className="border border-gray-600 border-solid p-8">
          <h3 className="text-2xl">Preparation</h3>
          <p>Review the in-game complexity of various doughs</p>
        </Link>
        <Link to="/calculator" className="border border-gray-600 border-solid p-8">
          <h3 className="text-2xl">Calculate rolls</h3>
          <p>
            Generate the required difficulty modifiers for the creation of a
            pastry
          </p>
        </Link>
      </div>
    </>
  );
}
