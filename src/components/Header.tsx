import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div id="header" className="text-center">
      <Link to="/">
        <h1 className="text-4xl mb-6">Gubanev&apos;s Book of Many Pastry</h1>
      </Link>
    </div>
  );
}
