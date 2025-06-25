import React, { useState } from 'react';
import DeckTracker from './DeckTracker';
import CycleTracker from './CycleTracker';
import { CssBaseline, Container, Typography, Stack } from '@mui/material';


function App() {
  const [seenCards, setSeenCards] = useState([]);

  return (
    <>
      <CssBaseline /> {/* Resets default margins/padding */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#FF5F05' }} // Orange
        >
          Clash Calculator
        </Typography>
        <Stack direction="row" spacing={4} justifyContent="center">
        <DeckTracker seenCards={seenCards} setSeenCards={setSeenCards}/>
        <CycleTracker seenCards={seenCards}/> 
        </Stack>
      </Container>
    </> 
  );
}

export default App;
