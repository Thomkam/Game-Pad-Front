import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ searchQuery }) => {
  const [data, setData] = useState(null);
  const [platformFilter, setPlatformFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortFilter, setSortFilter] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    fetchData(searchQuery, currentPage);
  }, [searchQuery, platformFilter, typeFilter, sortFilter, currentPage]);

  const fetchData = async (searchQuery, page) => {
    try {
      let url =
        "https://api.rawg.io/api/games?key=57702026a7e348e0909c2b9c2dac08e7";
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }
      url += `&page=${page}&page_size=${resultsPerPage}`;
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = () => {
    if (!data) return [];
    let filteredResults = data.results.slice();

    // Filtre par plateforme
    if (platformFilter !== "All") {
      filteredResults = filteredResults.filter((result) =>
        result.platforms.some(
          (platform) => platform.platform.slug === platformFilter
        )
      );
    }

    // Filtre par type
    if (typeFilter !== "All") {
      filteredResults = filteredResults.filter((result) =>
        result.genres.some((genre) => genre.slug === typeFilter)
      );
    }

    // Trie les résultats
    switch (sortFilter) {
      case "name":
        filteredResults.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "date":
        filteredResults.sort(
          (a, b) => new Date(a.released) - new Date(b.released)
        );
        break;
      case "rating":
        filteredResults.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filteredResults;
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const filteredResults = filterData();

  return (
    <main>
      <div>
        {/* Dropdown plateforme */}
        <select onChange={(e) => setPlatformFilter(e.target.value)}>
          <option value="All">All Platforms</option>
          <option value="playstation5">PlayStation 5</option>
          <option value="playstation4">PlayStation 4</option>
          <option value="playstation3">PlayStation 3</option>
          <option value="xbox360">Xbox</option>
          <option value="xbox-one">Xbox one</option>
          <option value="xbox-series-x">Xbox series x</option>
          <option value="nintendo-switch">Nintendo Switch</option>
          <option value="pc">PC</option>
          <option value="macos">Apple Macintosh</option>
          <option value="linux">Linux</option>
          {/*           <option value="nintendo">Nintendo</option>
          <option value="playStation">PlayStation</option>
          <option value="mac">Mac</option> */}
        </select>

        {/* Dropdown par type */}
        <select onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="All">All Types</option>
          <option value="action">Action</option>
          <option value="adventure">Adventure</option>
          <option value="puzzle">Puzzle</option>
          <option value="role-playing-games-rpg">RPG</option>
          <option value="shooter">Shooter</option>
          <option value="indie">Shooter</option>
          <option value="platformer">Platformer</option>
        </select>

        {/* Dropdown résultats */}
        <select onChange={(e) => setSortFilter(e.target.value)}>
          <option value="name">Name</option>
          <option value="date">Date</option>
          <option value="rating">Rating</option>
        </select>

        {/* Affichage des résultats */}
        {filteredResults.length === 0 ? (
          <div>No games found</div>
        ) : (
          filteredResults.map((result) => {
            return (
              <div key={result.id}>
                <img src={result.background_image} alt={result.name} />
                <p>{result.name}</p>
              </div>
            );
          })
        )}
        <div>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button onClick={nextPage}>Next Page</button>
        </div>
      </div>
    </main>
  );
};

export default Home;
