import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="home">
      <div className="home-inner">
        <h1 className="x-large">
          Polyglot <i className="fas fa-comment-dots" />
        </h1>
        <p className="text">
          Connect with native speakers from the whole world{" "}
          <i className="fas fa-globe-americas" />
        </p>
        <div className="buttons">
          <Link to="/auth/register" className="btn btn-main">
            Sign up
          </Link>
          <Link to="/auth/login" className="btn btn-light">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
