import { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";
import { client } from "./lib/appwrite";
import { AppwriteException } from "appwrite";
import AppwriteSvg from "../public/appwrite.svg";
import ReactSvg from "../public/react.svg";

function App() {
  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without The Hassle</h1>
        </header>
        <p>Search</p>
      </div>
    </main>
  )
}

export default App
