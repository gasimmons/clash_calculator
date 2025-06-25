import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, List, ListItem, Typography } from "@mui/material";
import Select from 'react-select';

const DeckTracker = ({ seenCards, setSeenCards }) => {
  const [metaDecks, setMetaDecks] = useState([]);
  const [predictedDecks, setPredictedDecks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/meta-decks").then((res) => {
      setMetaDecks(res.data);
    });
  }, []);

  useEffect(() => {
    if (seenCards.length > 0) {
      axios.post("http://localhost:5001/api/predicted-decks", { seenCards })
        .then((res) => setPredictedDecks(res.data));
    }
  }, [seenCards]);

  const handleCardClick = (card) => {
    if (seenCards.includes(card)) {
      setSeenCards(seenCards.filter((c) => c !== card));
    }
    else {
      setSeenCards([...seenCards, card])
    }
  };

  const [cardOptions, setCardOptions] = useState([]);

  fetch("/cards.txt")
  .then((res) => res.text())
  .then((text) => {
    const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);
    setCardOptions(lines.map((card) => ({ label: card, value: card })));
  })
  .catch(console.error);

  return (
    <Card sx={{ p: 3, width: '100%', height: '100%' }}>
      <Typography variant="h5" gutterBottom>Opponent's Cards</Typography>
      <div style={{ marginBottom: '1rem' }}>
        {seenCards.map((card) => (
          <Button
            key={card}
            onClick={() => handleCardClick(card)} 
            variant="contained"
            sx={{ m: 0.5 }}
          >
            {card}
          </Button>
        ))}
      </div>
  
      <Typography variant="h6">Add Card</Typography>
      <Select
        options={cardOptions}
        onChange={(selected) => selected && handleCardClick(selected.value)}
        placeholder="Search for a card..."
        isSearchable
        isClearable
        styles={{ container: (base) => ({ ...base, marginBottom: '1rem' }) }}
      />
  
      <Typography variant="h6" sx={{ mt: 2 }}>Predicted Decks</Typography>
      <List>
        {predictedDecks.map((deck) => (
          <ListItem key={deck.id}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle1">
                {deck.name} ({Math.round(deck.confidence * 100)}%)
              </Typography>
              <Typography variant="body2">{deck.cards.join(", ")}</Typography>
            </Card>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default DeckTracker;