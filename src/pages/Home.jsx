import { useEffect, useState } from "react";
import axios from "axios";
/* import { Link } from "react-router-dom";
 */

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.rawg.io/api/games?key=57702026a7e348e0909c2b9c2dac08e7"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <div>
        <p>Hello HOME </p>
        {data.results.map((result) => {
          return (
            <div key={result.id}>
              <p>{result.name}</p>
              <img src={result.background_image} alt={result.name} />
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
