import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Card } from 'react-bootstrap';
import { useState } from 'react';

const MainPage = () => {
  const {user} = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);

  const songs = [
    "Bohemian Rhapsody",
    "Imagine",
    "Hey Jude",
    "Stairway to Heaven",
    "Sweet Child O' Mine"
  ]; // דוגמת רשימת שירים


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = songs.filter(song =>
      song.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSongs(results);
  };

  return (
    <>
      {!user.isAdmin && 
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
          <div className="card text-center text-white bg-dark border-light p-3 shadow-lg">
            <h1 className="card-title" style={{
                fontWeight: 300,
                fontSize: "2.5rem",
              }}>Waiting for next song...</h1>
          </div>
        </div>
      }

      {user.isAdmin &&
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
          <Card className="text-center text-white bg-dark border-light p-5 shadow-lg">
            <h1 className="card-title mb-4" style={{ fontWeight: 300, fontSize: '2.5rem' }}>
              Search any song...
            </h1>
            <Form onSubmit={handleSearchSubmit}>
              
                <Form.Control
                  type="text"
                  placeholder="Enter song text..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              <Button className="mt-3" variant="primary" type="submit">
                Search
              </Button>
            </Form>
            <div className="mt-4">
              {filteredSongs.length > 0 ? (
                <ul>
                  {filteredSongs.map((song, index) => (
                    <li key={index} style={{ color: 'white' }}>
                      {song}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: 'white' }}>No songs found...</p>
              )}
            </div>
          </Card>
        </div>
      }
    </>
  )
}

export default MainPage

