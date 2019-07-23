import React from "react";

const Home = () => {
  return (
    <section className="home">
      <div className="home-inner">
        <h1 className="x-large">Polyglot</h1>
        <p className="text">
          Connect with native speakers from the whole world{" "}
          <i className="fas fa-globe-americas" />
        </p>
        <div className="buttons">
          <a href="register.html" className="btn btn-main">
            Sign Up
          </a>
          <a href="login.html" className="btn btn-light">
            Login
          </a>
        </div>
      </div>
    </section>
  );
};

export default Home;
