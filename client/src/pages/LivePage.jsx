import React, {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Button } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';

const LivePage = () => {
  const {user, songData} = useContext(AuthContext);
  const [isScrolling, setIsScrolling] = useState(true);

  console.log('songData:', songData);
// פונקציה להתחלת / עצירת הגלילה
  const toggleScrolling = () => setIsScrolling(!isScrolling);

  useEffect(() => {
    let scrollInterval;

    // אם הגלילה מופעלת
    if (isScrolling) {
      scrollInterval = setInterval(() => {
        // גלילה כלפי מטה
        window.scrollBy(0, 1);  // גלילה בכיוון האנכי כל 10 פיקסלים
      }, 50);  // קצב הגלילה (מילישניות)
    }

    // עצירת הגלילה
    return () => clearInterval(scrollInterval);
  }, [isScrolling]);

  const title = songData.file.slice(0, -5);
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
    </Container>
    </>
  )
}

export default LivePage
