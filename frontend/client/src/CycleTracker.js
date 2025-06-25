import React, { useState, useEffect } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useHotkeys } from "react-hotkeys-hook"
import {
  Button,
  Card,
  Typography,
  Box,
  Stack,
  Chip,
} from "@mui/material";

const CycleTracker = ({ seenCards }) => {
    const [deck, setDeck] = useState([]);
  
    useEffect(() => {
      const fullDeck = [...seenCards];
      while (fullDeck.length < 8) {
        fullDeck.push("unknown");
      }
      setDeck(fullDeck);
    }, [seenCards]);

    const [playedCards, setPlayedCards] = useState([]);
    const [nextCards, setNextCards] = useState([]);
  
    const hand = deck.slice(0, 4);
    const queue = deck.slice(4);

    const handlePlayCard = (index) => {
        if (index > 3) return;
        if (deck[index] === "unknown") return;
        const selectedCard = deck[index];
        const newDeck = [...deck];
        newDeck.splice(index, 1);  
        newDeck.push(selectedCard); 
        setDeck(newDeck);
      };

    useHotkeys('1', () => handlePlayCard(0), [deck]);
    useHotkeys('2', () => handlePlayCard(1), [deck]);
    useHotkeys('3', () => handlePlayCard(2), [deck]);
    useHotkeys('4', () => handlePlayCard(3), [deck]);
  
    const handleReset = () => {
      setPlayedCards([]);
      setNextCards([]);
    };
  
    return (
        <Card sx={{ p: 3, width: '100%', height: '100%' }}>
        <Typography variant="h5" gutterBottom>
          Cycle Tracker
        </Typography>

  
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Opponent's Hand</Typography>
            <Stack direction="row" spacing={2}>
                {hand.map((card, index) => (
                <Chip
                    key={index}
                    label={card === "unknown" ? <HelpOutlineIcon /> : card}
                    color="primary"
                    size="medium"
                    onClick={() => handlePlayCard(index)}
                    sx={{ fontSize: '1.1rem', py: 2, px: 2 }}
                />
                ))}
            </Stack>
        </Box>

        <Box>
            <Typography variant="subtitle1">Next in Cycle</Typography>
            <Stack direction="row" spacing={1}>
                {queue.map((card, index) => (
                <Chip
                    key={index + 4}
                    label={card === "unknown" ? <HelpOutlineIcon /> : card}
                    size="small"
                    sx={{ opacity: 0.7 }}
                />
                ))}
            </Stack>
        </Box>
  
        {/* Played Cards */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Played Cards
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            {playedCards.map((card, index) => (
              <Chip
                key={index}
                label={card === "unknown" ? <HelpOutlineIcon /> : card}
                variant="outlined"
                color={card === "unknown" ? "secondary" : "default"}
              />
            ))}
          </Stack>
        </Box>

        {nextCards.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Next Expected
            </Typography>
            <Stack direction="row" spacing={1}>
              {nextCards.map((card, index) => (
                <Chip
                  key={index}
                  label={card === "unknown" ? <HelpOutlineIcon fontSize="large" /> : card}
                  color="warning"
                  size="medium"
                />
              ))}
            </Stack>
          </Box>
        )}
      </Card>
    );
  };
  
  export default CycleTracker;