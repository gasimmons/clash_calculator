const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// TEMP DB (SET UP SQLITE DB LATER)
let metaDecks = [
    {
        id: 1, 
        name: "2.6 Hog Cycle",
        cards: ["Hog Rider", "Fireball", "Skeletons", "Ice Spirit", "Cannon", "Musketeer", "The Log", "Ice Golem"],
        winRate: 0.57,
        usageRate: 0.10,
    },
    {
        id: 2,
        name: "Pekka Bridge Spam",
        cards: ["Pekka", "Bandit", "Royal Ghost", "Dark Prince", "Poison", "Zap", "Electro Wizard", "Battle Ram"],
        winRate: 0.54,
        usageRate: 0.085,
    }
];

app.get("/api/meta-decks", (req, res) => {
    res.json(metaDecks);
});

app.post("/api/predicted-decks", (req, res) => {
    const { seenCards } = req.body;

    const scoredDecks = metaDecks.map((deck) => {
        const matchedCards = deck.cards.filter((card) => seenCards.includes(card));
        const confidence = (matchedCards.length / seenCards.length) * deck.usageRate;
        return { ...deck, confidence };
      });
    
      const predictedDecks = scoredDecks
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, 10);
    
      res.json(predictedDecks);
})

app.listen(5001, () => console.log("Server running on port 5001"))

app.get("/", (req, res) => {
    res.send("Server is working");
  });