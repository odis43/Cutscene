import React, { useEffect, useState } from "react";
import { auth, getGames } from "./firebase";
import { useAuth } from "./AuthContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./Favorites.css";
import Sidebar from "./Sidebar";
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

  const numGames = 0;
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
    <div className="main-content">
      <Sidebar />
      <h1>your favorites.</h1>

      <div>
        <ul className="favorites">
          {favGames.map(
            (game) => (
              console.log(game),
              (
                <ul key={game.id}>
                  <Popup
                    trigger={<button className="favButton">{game.name}</button>}
                    modal
                    contentStyle={{
                      width: "100%",
                      padding: "0",
                    }}
                  >
                    {(close) => (
                      <div className="popup-content">
                        <div className="popup-header">
                          <h1>{game.name}</h1>
                        </div>
                        <div className="popup-body">
                          <p>{game.description_raw}</p>
                          <img
                            className="popup-image"
                            src={game.background_image}
                            alt="game"
                          />
                        </div>
                        <div className="popup-info">
                          <ul>
                            {game.parent_platforms.map((platform, index) => (
                              <li key={index}>{platform.platform.name}</li>
                            ))}
                          </ul>
                        </div>
                        <button className="popup-button" onClick={close}>
                          Close
                        </button>
                      </div>
                    )}
                  </Popup>
                </ul>
              )
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default Favorites;
