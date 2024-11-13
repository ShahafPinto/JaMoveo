import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { useContext } from "react";
import io from "socket.io-client";
import { SessionContext } from "../context/SessionContext";

const ResultsPage = () => {
  const { updateCurrentSong } = useContext(SessionContext);

  const location = useLocation();
  const { songs } = location.state || { songs: [] };
  const navigate = useNavigate();
  const socket = io(import.meta.env.VITE_SOCKET_URL);

  const handleSelectSong = (song) => {
    updateCurrentSong(song);
    socket.emit("adminSelectSong", { action: "songSelected", song: song });
    navigate("/live");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-light mb-4">Search Results</h1>
      {songs.length > 0 ? (
        <ListGroup>
          {songs.map((song, index) => (
            <ListGroup.Item
              key={index}
              className="bg-dark text-light mb-3 p-3 rounded shadow-sm"
              as="a"
              href={`#song-${index}`}
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectSong(song)}
            >
              <h4>{`#${index + 1} Song: ${song.file.slice(0, -5)}`}</h4>
              <p>Artist: {song.artist || "-"}</p>
              <p>Image: {song.image || "-"}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-center text-light">No songs found.</p>
      )}
    </div>
  );
};

export default ResultsPage;
