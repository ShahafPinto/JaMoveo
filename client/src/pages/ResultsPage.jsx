import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultsPage = () => {
  const location = useLocation();
  const { songs } = location.state || { songs: [] };

  return (
    <div>
        <h1>Search Results</h1>
        {songs.length > 0 ? (
            <ul>
                {songs.map((song, index) => (
                    <li key={index}>{song.title}</li> // הצגת פרטי השיר בהתאם למבנה
                ))}
            </ul>
        ) : (
            <p>No songs found.</p>
        )}
    </div>
  )
}

export default ResultsPage
