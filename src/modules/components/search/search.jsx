import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import axios from 'axios';
import { baseUrl } from '../../../App';

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  const debouncedSearch = debounce((query) => {
   
    axios.get(`${baseUrl}/users/${searchQuery}`)
      
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
    <div className="container mx-auto mt-4">
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded focus:outline-none"
          placeholder="Search for a user"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>
      <ul>
        {searchResults.map((user) => (
          <li key={user.id} className="mb-2">
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;