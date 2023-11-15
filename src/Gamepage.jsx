// GamePage.js
import React from "react";
import Heart from "@react-sandbox/heart";
import { useLocation } from "react-router-dom";
import { Favorited, logout, unFavorited, alrFav } from "./firebase";
import { useAuth } from "./AuthContext";
import Sidebar from "./Sidebar";

const GamePage = () => {
  const { currUser } = useAuth();
  const { state } = useLocation();
  const { gameData, isFavorited, active } = state;
  console.log("THIS IS IN GAMEPAGE", gameData);

  function handleFavorite(user, game) {
    console.log("user: ", user);
    console.log("game:", game);
    Favorited(user, game);
  }

  function handleUnfavorite(user, game) {
    unFavorited(user, game);
  }
  return (
    <div className="flex bg-indigo-500 text-white">
      <Sidebar />
      <div className="game-details mt-6 ml-44">
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
    </div>
  );
};

export default GamePage;
