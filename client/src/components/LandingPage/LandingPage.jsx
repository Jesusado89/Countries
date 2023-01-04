import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landingPage">
      <h1 className="landingTitle"> Welcome </h1>
      <h2 className="landingSubTitle"> to my project</h2>
      <Link to="/home">
        <button className="landingButton"> Start experience </button>
      </Link>
    </div>
  );
}
