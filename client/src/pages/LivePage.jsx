import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client';
import { SessionContext } from '../context/SessionContext';
import {baseUrl} from '../utils/services';

const LivePage = () => {
  const {songData} = useContext(SessionContext);
  const {user} = useContext(AuthContext);
  const [isScrolling, setIsScrolling] = useState(true);
  const navigate = useNavigate();
  const socket = io("http://localhost:3000"); 

  console.log('songData in live page:', songData);
  const toggleScrolling = () => setIsScrolling(!isScrolling);

  useEffect(() => {
    let scrollInterval;
    if (isScrolling) {
      scrollInterval = setInterval(() => {
        window.scrollBy(0, 1); 
      }, 50); 
    }
    return () => clearInterval(scrollInterval);
  }, [isScrolling]);

  const title = songData.file.slice(0, -5);

  const handleQuit = () => {
    socket.emit('adminQuit', { action: 'quit' });
    navigate('/');
  };

  return (
    <>
    <div
        style={{
          color: '#FFD700',
          fontSize: '3rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '30px',
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)',
        }}
      >
        {title}
      </div>
    <Container
      fluid
      style={{
        backgroundColor: '#1a1a1a',
        padding: '40px',
        maxWidth: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      {songData.song.map((verse, index) => (
        <div
          key={index}
          className="mb-4"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '15px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          {/* תצוגת כל מילה עם האקורד, אם יש */}
          {verse.map((word, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* אזור האקורד */}
              <div
                style={{
                  color: '#FFD700',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)',
                  minHeight: '59px', // גובה קבוע לאקורדים, גם אם הוא ריק
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {user.instrument !== 'singer' ? word.chords || '' : ''}
              </div>

              {/* אזור המילים */}
              <div
                style={{
                  color: '#fff',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  minHeight: '50px', // גובה קבוע למילים
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}
              >
                {word.lyrics}
              </div>
            </div>
          ))}
        </div>
      ))}
      {/* כפתור להתחלת/הפסקת הגלילה */}
      <Button
        onClick={toggleScrolling}
        variant="primary"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
        }}
      >
        {isScrolling ? 'Stop' : 'Start'}
      </Button>
      {/* Quit Button (Only visible for admin) */}
      {user.isAdmin && (
          <Button
            onClick={handleQuit}
            variant="danger"
            style={{
              position: 'fixed',
              bottom: '80px',
              right: '20px',
              padding: '10px 20px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            Quit
          </Button>
        )}
    </Container>
    </>
  )
}

export default LivePage
