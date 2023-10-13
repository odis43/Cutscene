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

import { SportsEsports } from "@mui/icons-material";
function Sidebar() {
  const tableData = [
    { icon: <FavoriteIcon />, title: "Favorites", goto: "/favorites" },
    { icon: <ListIcon />, title: "Lists", goto: "/favorites" },
  ];
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/search">
          <SportsEsports />
        </Link>
      </div>
      <table className="sidebar-table">
        <tbody>
          {tableData.map((item, index) => (
            <tr className="table-row" key={index}>
              <Link
                style={{ textDecoration: "  none", color: "inherit" }}
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

export default Sidebar;
