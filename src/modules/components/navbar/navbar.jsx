import React, { useState } from "react";
import "./navbar.css";
import axios from "axios";
import { baseUrl } from "../../../App";
import debounce from "lodash/debounce";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debouncedSearch = debounce((query) => {
    axios
      .get(`${baseUrl}/users/${searchQuery}`)

      .then((res) => {
        setSearchResults(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, 300);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };
  return (
    <>
      <nav className="navbar fixed-top navbar-light bg-light">
        <img src="images/insta_logo.png" className="icon" />

        <form>
          <span>
            <input
              type="text"
              placeholder="Search for a user"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="search-bar"
            />
            <img
              src="images/glass.png"
              className="glass"
              onClick={handleSearchInputChange}
            />

            <ul>
              {searchResults.map((user) => (
                <li key={user.id} className="mb-2 list">
                  {user.username}
                </li>
              ))}
            </ul>
          </span>
        </form>
      </nav>
    </>
  );
};
export default Navbar;
