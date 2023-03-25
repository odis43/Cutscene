import React, { useState, useEffect } from "react";
import "./Search.css";

function Search() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState();
  const [gameData, setGameData] = useState([]);
  const [DataLoad, setDataLoad] = useState(false);

  function handleClick(id) {
    setDataLoad(true);
    console.log("before setting game", id);
    setGame(id);
  }

  useEffect(() => {
    console.log("game changed:", game);
    const url = `https://api.rawg.io/api/games/${game}?key=758e98276d1247aba00495023362b623`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGameData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [game]);

  useEffect(() => {
    const url = `https://api.rawg.io/api/games?key=758e98276d1247aba00495023362b623${
      query ? `&search=${query}` : ""
    }`;
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [query]);

  return (
    <div>
      <form>
        <label>
          Search for a game:
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((game) => (
            <li key={game.id}>
              <button onClick={() => handleClick(game.id)} href="#">
                {game.name} {game.id}{" "}
              </button>
            </li>
          ))}
        </ul>
      )}

      {DataLoad ? (
        <div>
          <h2>{gameData.name}</h2>
          <p>{gameData.description_raw}</p>
          <img src={gameData.background_image} alt="game" />
        </div>
      ) : (
        <p>JUST A MINUTE!</p>
      )}
    </div>
  );
}

export default Search;
