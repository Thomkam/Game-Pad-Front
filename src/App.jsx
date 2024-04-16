import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import Home from "./pages/Home";

// Components
import Header from "./assets/components/Header";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (searchGame) => {
    setSearchQuery(searchGame);
  };
  return (
    <Router>
      <Header onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
      </Routes>
    </Router>
  );
}

export default App;
