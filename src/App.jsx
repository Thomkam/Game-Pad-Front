import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";

// Components
/* import Header from "./components/Header";
 */
function App() {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/game/:id" element={<Game />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
