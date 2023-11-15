import React, { useState, useEffect } from "react";
import "./Search.css";
import { Favorited, logout, unFavorited, alrFav } from "./firebase";
import { Button } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import Heart from "@react-sandbox/heart";
import Sidebar from "./Sidebar";
import GamePage from "./Gamepage";
import { SportsEsports } from "@mui/icons-material";
import { Navigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
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
        console.log("THIS IS THE DATA, ", data);
        if (data && data.slug != "undefined") {
          setGameData(data);
          // Now that gameData is set, navigate to /gamepage
          navigate("/gamepage", {
            state: {
              gameData: data,
              isFavorited: isFavorited,
              active: active,
            },
          });
        }
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
        <p className="loading"></p>
      </div>
    </div>
  );
}

export default Search;
