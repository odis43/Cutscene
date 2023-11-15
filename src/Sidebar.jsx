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
    <div className="sidebar bg-indigo-600">
      <div className="sidebar-header">
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/search">
          <SportsEsports />
        </Link>
      </div>
      <table className="table-auto ml-7">
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
