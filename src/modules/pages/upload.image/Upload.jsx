import React, { useState } from "react";
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState();

  const upload = () => {
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:3300/upload', formData)
      .then(res => {
        // Handle the response, e.g., display a success message
        console.log('File uploaded successfully:', res.data);
      })
      .catch(err => {
        // Handle errors, e.g., display an error message
        console.error('File upload error:', err);
      });
  }

  return (
    <div className="mt-4">
      <input
        type="file"
        accept="image/*" 
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        type="button"
        onClick={upload}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
      >
        Upload
      </button>
    </div>
  );
}

export default Upload;
