import React, { useState, useEffect } from "react";
import "./Search.css";
import Landing from "./Landing";
import { Favorited, auth } from "./firebase";
import { Button } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
function Search() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState();
  const [gameData, setGameData] = useState([]);
  const [dataLoad, setDataLoad] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  function handleClick(id) {
    setDataLoad(true);
    setGame(id);
    setShowSuggestions(false);
  }

  const { currUser } = useAuth();
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
    if (query.trim() === "") {
      setData([]);
      setShowSuggestions(false);
      return;
    }

    const url = `https://api.rawg.io/api/games?key=758e98276d1247aba00495023362b623${
      query ? `&search=${query}` : ""
    }`;
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
        setLoading(false);
        setShowSuggestions(true);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="search-page">
      <div className="main-content">
        <Landing />
        <div className="search-container">
          <form className="search-form">
            <label>
              Add a game
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <button className="search-button" type="submit">
              Search
            </button>
          </form>

          {showSuggestions && (
            <ul className="game-list">
              {data.map((game) => (
                <li key={game.id}>
                  <button
                    className="modern-game-button"
                    onClick={() => handleClick(game.id)}
                  >
                    {game.name}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {loading ? (
            <p className="loading">Loading...</p>
          ) : dataLoad ? (
            <div className="game-details">
              <h2>{gameData.name}</h2>
              <p>{gameData.description_raw}</p>
              <img src={gameData.background_image} alt="game" />
              <Button onClick={() => Favorited(currUser.uid, gameData)}>
                Add to favorites
              </Button>
              <Button>
                <Link to="/favorites">Go to Favorites</Link>
              </Button>
            </div>
          ) : (
            <p className="loading"></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
