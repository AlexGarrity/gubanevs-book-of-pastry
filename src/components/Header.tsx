import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div id="header" className="text-center">
      <Link to="/">
        <h1 className="text-4xl pt-6 pb-8 border-b text-red-800 tracking-wider font-semibold">Gubanev&apos;s Book of Many Pastry</h1>
      </Link>
    </div>
  );
}
