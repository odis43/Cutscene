import React, { useEffect, useState } from "react";
import { auth, getGames } from "./firebase";
import { useAuth } from "./AuthContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./Favorites.css";
import {
  getFirestore,
  query,
  getDocs,
  where,
  addDoc,
  collection,
} from "firebase/firestore";
import { Button } from "react-bootstrap";

function HandleModal() {}
function Favorites() {
  const [favGames, setFavGames] = useState([]);
  const { currUser } = useAuth();

  useEffect(() => {
    if (currUser) {
      getGames(currUser.uid)
        .then((games) => {
          setFavGames(games);
        })
        .catch((error) => {
          console.log("Error fetching the games", error);
        });
    }
  }, [currUser]);
  return (
    <div>
      <h2>Favorited Games</h2>
      <ul>
        {favGames.map((game) => (
          <ul key={game.id}>
            <Popup trigger={<button>{game.name}</button>} modal>
              {(close) => (
                <div className="modal">
                  <div className="modal-head">{game.name}</div>
                  <div className="modal-content">
                    {" "}
                    <p className="modal-para">{game.description_raw}</p>
                    <img
                      className="modal-img"
                      src={game.background_image}
                      alt="game"
                    />
                    <div className="game-info">
                      <ul>
                        {game.platforms.map((platform, index) => (
                          <li key={index}>{platform.games_count}</li>
                        ))}
                      </ul>
                      <h4>Metacritic score: {game.metacritic}</h4>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </ul>
        ))}
      </ul>
    </div>
  );
}
export default Favorites;
