import React, { useState } from "react";
import "./Update.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

const UpdateProfilePicture = () => {
  const navigate = useNavigate();
  const userId = decodeToken(JSON.parse(localStorage.getItem("token"))).user
    ._id;

  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setMessage("Please select a file.");
      return;
    }

    const originalFileName = selectedFile.name;
    const fileExtension = originalFileName.split(".").pop(); // Replace with your product ID or generate as needed
    const renamedFileName = `${userId}.${fileExtension}`;
    const renamedFile = new File([selectedFile], renamedFileName, {
      type: selectedFile.type,
    });

    const formData = new FormData();
    formData.append("image", renamedFile);

    axios
      .post("http://localhost:3300/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMessage(response.data);
        toast.success("Picture Updated");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        setMessage("An error occurred while uploading the image.");
      });
  };
  return (
    <div className="container">
      <h3 className="text-secondary text-center">Update Profile Picture</h3>
      <br />
      <form>
        <div className="m-t-20">
          <input
            name="image"
            type="file"
            accept=".jpg"
            onChange={handleFileChange}
          />
          <br />
          <p>{message}</p>
        </div>
        <div className="m-t-20">
          <button
            className="btn btn-primary btn-md btn-block m-b-10 signupbtn"
            type="submit"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfilePicture;
