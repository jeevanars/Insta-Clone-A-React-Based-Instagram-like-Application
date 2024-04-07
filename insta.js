import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Insta.css';

function Insta() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [viewPhoto, setViewPhoto] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    if (currentUser && currentUser.username) {
      setUser(currentUser.username);
      const userData = JSON.parse(localStorage.getItem('users'));
      if (userData && userData[currentUser.username]) {
        setPhotos(userData[currentUser.username].photos || []);
      } else {
        setPhotos([]);
      }
    } else {
      setUser(null);
      setPhotos([]);
    }

    // Fetch user's name from localStorage and set it to state
    const storedUser = JSON.parse(localStorage.getItem(currentUser.username));
    if (storedUser) {
      setUserName(storedUser.name);
    }
  }, []);
  
  const handlePhotoUpload = () => {
    if (!selectedFile) {
      alert('Please select a photo to upload.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const photoURL = reader.result;
      const updatedPhotos = [...photos, { photo: photoURL, description }];
      const updatedUserData = { ...JSON.parse(localStorage.getItem('users')), [user]: { photos: updatedPhotos } };
      localStorage.setItem('users', JSON.stringify(updatedUserData));
      setPhotos(updatedPhotos);
      setDescription('');
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleViewPhoto = (photo) => {
    setViewPhoto(photo);
  };

  const handleCloseView = () => {
    setViewPhoto(null);
  };

  const handleDeletePhoto = (index) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    const updatedUserData = { ...JSON.parse(localStorage.getItem('users')), [user]: { photos: updatedPhotos } };
    localStorage.setItem('users', JSON.stringify(updatedUserData));
    setPhotos(updatedPhotos);
  };  

  const handleToggleExpand = () => {
    setExpandedDescription(!expandedDescription);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    setPhotos([]);
    navigate('/');
  };

  return (
    <div>
      <h2>Enter {userName && `your personal treasure trove of memories , ${userName}`}</h2>
      <div className="logout-container">
        {user && <button className="logout-button" onClick={handleLogout}>Logout</button>}
      </div>
      <div className="photo-upload">
        {/* <label htmlFor="file-upload" className="choose-file-button">Choose File</label> */}
        <input id="file-upload" type="file" onChange={handleFileChange} />
        <textarea placeholder="Add a caption" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <button onClick={handlePhotoUpload}>Post</button>
      </div>
      <div className="photo-grid">
        {photos.map((photoData, index) => (
          <div key={index} className="photo-container">
            <img src={photoData.photo} alt={`Photo ${index}`} onClick={() => handleViewPhoto(photoData.photo)} />
            <div className="photo-details">
              <div className="description-container">
                <p className={expandedDescription ? "expanded" : ""}>{photoData.description}</p>
                {/* {photoData.description.length > 100 && (
                  <button className="expand-button" onClick={handleToggleExpand}>
                    {expandedDescription ? "Collapse" : "View Full Description"}
                  </button>
                )} */}
              </div>
              <div className="photo-buttons">
                <button onClick={() => handleDeletePhoto(index)}>Delete</button>
                <button onClick={() => handleViewPhoto(photoData.photo)}>View</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {viewPhoto && (
        <div className="photo-view">
          <button onClick={handleCloseView}>Close</button>
          <img src={viewPhoto} alt="View Photo" />
        </div>
      )}
    </div>
  );
}

export default Insta;
