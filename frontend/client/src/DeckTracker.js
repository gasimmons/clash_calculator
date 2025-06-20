import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, List, ListItem, Typography } from "@mui/material";

const DeckTracker = () => {
  const [seenCards, setSeenCards] = useState([]);
  const [metaDecks, setMetaDecks] = useState([]);
  const [predictedDecks, setPredictedDecks] = useState([]);

  // Fetch meta decks on startup
  useEffect(() => {
    axios.get("http://localhost:5000/api/meta-decks").then((res) => {
      setMetaDecks(res.data);
    });
  }, []);

  // Predict decks when seenCards changes
  useEffect(() => {
    if (seenCards.length > 0) {
      axios.post("http://localhost:5000/api/predict-decks", { seenCards })
        .then((res) => setPredictedDecks(res.data));
    }
  }, [seenCards]);

  const handleCardClick = (card) => {
    if (!seenCards.includes(card)) {
      setSeenCards([...seenCards, card]);
    }
  };

  return (
    <div>
      <Typography variant="h4">Opponent's Cards</Typography>
      <div>
        {metaDecks.flatMap((deck) => deck.cards)
          .filter((card, index, arr) => arr.indexOf(card) === index) // Unique cards
          .map((card) => (
            <Button 
              key={card} 
              onClick={() => handleCardClick(card)}
              variant={seenCards.includes(card) ? "contained" : "outlined"}
            >
              {card}
            </Button>
          ))}
      </div>

      <Typography variant="h5">Predicted Decks</Typography>
      <List>
        {predictedDecks.map((deck) => (
          <ListItem key={deck.id}>
            <Card>
              <Typography>{deck.name} ({Math.round(deck.confidence * 100)}%)</Typography>
              <Typography>{deck.cards.join(", ")}</Typography>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DeckTracker;