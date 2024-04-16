import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ onSearch }) => {
  const [searchGame, setSearchGame] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchGame);
  };

  const handleChange = (event) => {
    setSearchGame(event.target.value);
  };

  return (
    <header>
      <h1>Game Search</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home </Link>
            <Link to="/">Sign In </Link>
            <Link to="/">Log In </Link>
            <Link to="/">My Collection</Link>
          </li>
        </ul>
      </nav>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Games..."
            value={searchGame}
            onChange={handleChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </header>
  );
};

export default Header;
