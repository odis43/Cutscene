import React, { useState, useEffect } from "react";
import "./Search.css";
import { Favorited, logout, unFavorited, alrFav } from "./firebase";
import { Button } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import Heart from "@react-sandbox/heart";
import Sidebar from "./Sidebar";

import { SportsEsports } from "@mui/icons-material";

function Search() {
  const { currUser } = useAuth();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState();
  const [gameData, setGameData] = useState([]);
  const [dataLoad, setDataLoad] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [active, setActive] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  function handleClick(id) {
    setDataLoad(true);
    setGame(id);
    setShowSuggestions(false);
  }

  const handleActive = (user, game) => {
    try {
      let isAlreadyFavorited = alrFav(user, game);
      console.log("this game is ", isAlreadyFavorited);
      return isAlreadyFavorited;
    } catch (error) {
      console.error(error);
      setActive(false); // Handle errors gracefully
    }
  };

  function handleFavorite(user, game) {
    console.log("user: ", user);
    console.log("game:", game);
    Favorited(user, game);
    setActive(true);
  }

  function handleUnfavorite(user, game) {
    unFavorited(user, game);
    setActive(false);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default form submission behavior
      // You can add your custom logic here if needed
    }
  };

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

  useEffect(() => {
    const checkFavorite = async () => {
      const favorited = await alrFav(currUser.uid, gameData);
      if (favorited) {
        console.log("heart is set to active");
        setActive(true);
      } else {
        console.log("heart is set to inactive");
        setActive(false);
      }
      setIsFavorited(favorited);
    };
    checkFavorite();
  }, [currUser.uid, gameData]);

  return (
    <div className="main-content">
      <Sidebar />
      <div className="search-container">
        <form className="mt-10">
          <h1 className="mb-4 text-2xl font-custom">add a game.</h1>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyPress={handleKeyPress}
            className="input-form w-96"
          />
        </form>

        {showSuggestions && (
          <ul className="game-list overflow-auto h-96 mt-5">
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
          <div className="game-details mt-6">
            <h2 style={{ paddingBottom: "10px" }}>{gameData.name}</h2>
            <div className="image-container">
              <img src={gameData.background_image} alt="game" />
            </div>
            <div className="game-info">
              <div className="description-column mt-5">
                <p>{gameData.description_raw}</p>
              </div>
              <div className="info-column">
                <div className="info-row">
                  {gameData.metacritic ? (
                    <h3>Metacritic: {gameData.metacritic}</h3>
                  ) : (
                    <h3>Metacritic: unavailable</h3>
                  )}
                </div>
                <div className="info-row">
                  <h3>Developer: {gameData.developers[0].name}</h3>
                </div>
                <div className="info-row">
                  <h3>Genre: {gameData.genres[0].name}</h3>
                </div>
                <div className="info-row">
                  <h3>
                    Platforms:{" "}
                    {gameData.platforms.map((platform, index) => (
                      <span key={platform.id}>
                        {index > 0 && ", "}
                        {platform.platform.name}
                      </span>
                    ))}
                  </h3>
                </div>
                <div className="info-row">
                  {isFavorited ? (
                    <Heart
                      inactiveColor="#3a04ce"
                      activeColor="#3a04ce"
                      width={28}
                      height={28}
                      active={active}
                      onClick={() => {
                        handleUnfavorite(currUser.uid, gameData);
                      }}
                    />
                  ) : (
                    <Heart
                      inactiveColor="#3a04ce"
                      activeColor="#3a04ce"
                      width={28}
                      height={28}
                      active={active}
                      onClick={() => {
                        handleFavorite(currUser.uid, gameData);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="loading"></p>
        )}
      </div>
    </div>
  );
}

export default Search;
