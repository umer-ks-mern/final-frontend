import React, { useState } from "react";
import "./navbar.css";
import axios from "axios";
import { baseUrl } from "../../../App";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

const Navbar = () => {
  const activeUser = useState(
    decodeToken(JSON.parse(localStorage.getItem("token"))).user
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate=useNavigate();
  const debouncedSearch = debounce((query) => {
    axios
      .get(`${baseUrl}/users/${searchQuery}`)

      .then((res) => {
        setSearchResults(res.data);
        console.log(searchResults)
       
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
        <img src="/images/insta_logo.png" className="icon" />

        <form>
          <span>
            <input
              type="text"
              placeholder="Search for a user"
              //value={searchQuery}
              onChange={handleSearchInputChange}
              className="search-bar"
            />
            <img
              src="/images/glass.png"
              className="glass"
              onClick={handleSearchInputChange}
              
            />

            <ul>
              {searchResults.map((user) => (
                <li key={user._id} className="mb-2 list"  onClick={()=>{
                
                  (!(activeUser._id==user._id))?
                  navigate(`/other-user/${user._id}`):
                  navigate("/")
                  
                }}>
                  <img src={`${baseUrl}/images/${user._id}.jpg`} className="search-user-dp"/>
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
