import React, { useEffect, useState } from "react";
import { auth, getGames } from "./firebase";
import { useAuth } from "./AuthContext";
import {
  getFirestore,
  query,
  getDocs,
  where,
  addDoc,
  collection,
} from "firebase/firestore";

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
          <li key={game.id}>
            <div>{game.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Favorites;
