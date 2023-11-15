import React, { useState, useEffect } from "react";
import "./Search.css";
import { Favorited, logout, unFavorited, alrFav } from "./firebase";
import { Button } from "react-bootstrap";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ListIcon from "@mui/icons-material/List";
import LogoutIcon from "@mui/icons-material/Logout";
import QueueIcon from "@mui/icons-material/Queue";
import Heart from "@react-sandbox/heart";
import "flowbite";

import { SportsEsports } from "@mui/icons-material";
function Sidebar() {
  const tableData = [
    { icon: <FavoriteIcon />, title: "Favorites", goto: "/favorites" },
    { icon: <ListIcon />, title: "Lists", goto: "/favorites" },
    { icon: <QueueIcon />, title: "Playlist" },
  ];
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/search">
          <SportsEsports />
        </Link>
      </div>
      <table className="table-auto ml-4">
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              {item.icon.type === QueueIcon ? (
                <div>
                  <button
                    style={{ border: "none" }}
                    onClick={() => console.log("Button clicked")}
                    data-popover-target="popover-default"
                  >
                    {item.icon}
                  </button>
                  <div
                    data-popover
                    id="popover-default"
                    role="tooltip"
                    class="invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 playlistButton"
                  >
                    <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                      <h3 class="font-semibold text-gray-900 dark:text-white">
                        Popover title
                      </h3>
                    </div>
                    <div class="px-3 py-2">
                      <p>
                        And here's some amazing content. It's very engaging.
                        Right?
                      </p>
                    </div>
                    <div data-popper-arrow></div>
                  </div>
                </div>
              ) : (
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={item.goto}
                >
                  <td className="pb-4">{item.icon}</td>
                </Link>
              )}
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

export default Sidebar;
