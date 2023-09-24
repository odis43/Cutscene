import React, { useState, useEffect } from "react";
import "./Search.css";
import { Favorited, logout } from "./firebase";
import { Button } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import { SportsEsports } from "@mui/icons-material";
function Sidebar() {
  const { currUser } = useAuth();
  // const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarMinimized(!isSidebarMinimized);
  // };

  // const sidebarClass = isSidebarMinimized ? "sidebar minimized" : "sidebar";
  const tableData = [
    { icon: <FavoriteIcon />, title: "Favorites", goto: "/favorites" },
    { icon: <ListIcon />, title: "Lists", goto: "/favorites" },
  ];
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <SportsEsports />
      </div>
      <table className="sidebar-table">
        <tbody>
          {tableData.map((item, index) => (
            <tr className="table-row" key={index}>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={item.goto}
              >
                <td>{item.icon}</td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>

      <Link
        className="logout"
        style={{ textDecoration: "none", color: "inherit" }}
        to="/"
        onClick={logout}
      >
        <LogoutIcon />
      </Link>
    </div>
  );
}

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
    <div className="main-content">
      <Sidebar />
      <div className="search-container">
        <form className="search-form">
          <h1>add a game.</h1>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
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
            <div className="game-info">
              <p className="description">{gameData.description_raw}</p>
              <h3 style={{ display: "inline-block" }}>
                Metacritic: {gameData.metacritic}
              </h3>
            </div>
            <img src={gameData.background_image} alt="game" />
            <Button onClick={() => Favorited(currUser.uid, gameData)}>
              Add to favorites
            </Button>
          </div>
        ) : (
          <p className="loading"></p>
        )}
      </div>
    </div>
  );
}

export default Search;
