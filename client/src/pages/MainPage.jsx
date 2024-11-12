import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MainPage = () => {
  const {user, joinRehearsal, isSongSelected} = useContext(AuthContext);

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  console.log('searchQuery',searchQuery);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
      if (user) {
          joinRehearsal(user._id); // הצטרפות לחדר החזרות
      }
  }, [user]);

  useEffect(() => {
    if (isSongSelected) {
      navigate('/live');
    }
  }, [isSongSelected]);

  const handleSearchSubmit = async(e) => {
    e.preventDefault();
    console.log('searchQuery after submit',searchQuery);
    // שלח את בקשת החיפוש לשרת
    const response = await fetch(`http://localhost:5000/songs/search?query=${searchQuery}`);
    const data = await response.json();

    // ניווט לעמוד התוצאות
    navigate(`/results`, { state: { songs: data } });
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
          </Card>
        </div>
      }
    </>
  )
}

export default MainPage

