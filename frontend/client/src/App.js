import React from 'react';
import DeckTracker from './DeckTracker'; // Import your component
import { CssBaseline, Container, Typography } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline /> {/* Resets default margins/padding */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#FF5F05' }} // Clash Royale orange
        >
          Clash Royale Deck Tracker
        </Typography>
        <DeckTracker /> {/* Your main component */}
      </Container>
    </>
  );
}

export default App;
