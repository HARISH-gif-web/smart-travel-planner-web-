import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.post("/api/plan-trip", (req, res) => {
    const { source, destination, days, budget } = req.body;
    
    // Mock AI/Backend Logic
    const baseCost = budget === "Low" ? 1500 : budget === "Medium" ? 4000 : 10000;
    const travelCost = 2500;
    const hotelCost = baseCost * days;
    const foodCost = (budget === "Low" ? 500 : budget === "Medium" ? 1500 : 4000) * days;
    const miscCost = 1000 * days;
    const totalCost = travelCost + hotelCost + foodCost + miscCost;

    const plan = {
      budget: {
        total: totalCost,
        breakdown: [
          { name: "Travel", value: travelCost },
          { name: "Hotel", value: hotelCost },
          { name: "Food", value: foodCost },
          { name: "Misc", value: miscCost },
        ],
        dailyExpenses: Array.from({ length: days }).map((_, i) => ({
          day: `Day ${i + 1}`,
          cost: (hotelCost + foodCost + miscCost) / days,
        })),
      },
      weather: {
        temp: 28,
        condition: "Sunny",
        forecast: Array.from({ length: 5 }).map((_, i) => ({
          day: `Day ${i + 1}`,
          temp: 28 + Math.floor(Math.random() * 5 - 2),
          condition: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
        })),
        recommendation: "Perfect weather for sightseeing! Don't forget sunscreen.",
      },
      places: [
        { name: "City Palace", category: "Historical", description: "A beautiful palace with rich history.", image: "https://picsum.photos/seed/palace/400/300" },
        { name: "Local Market", category: "Shopping", description: "Vibrant market for local goods.", image: "https://picsum.photos/seed/market/400/300" },
        { name: "Sunset Point", category: "Nature", description: "Great views of the sunset.", image: "https://picsum.photos/seed/sunset/400/300" },
      ],
      food: [
        { name: "Local Thali", price: budget === "Low" ? 150 : budget === "Medium" ? 400 : 1200, type: "Veg" },
        { name: "Street Chaat", price: budget === "Low" ? 50 : budget === "Medium" ? 150 : 400, type: "Veg" },
        { name: "Special Biryani", price: budget === "Low" ? 250 : budget === "Medium" ? 600 : 1800, type: "Non-Veg" },
      ],
      transport: [
        { mode: "Bus", cost: 800, time: "12h" },
        { mode: "Train", cost: 1500, time: "8h" },
        { mode: "Flight", cost: 4500, time: "2h" },
      ],
      itinerary: Array.from({ length: days }).map((_, i) => ({
        day: i + 1,
        title: i === 0 ? "Arrival & Local Exploration" : i === days - 1 ? "Shopping & Departure" : "Sightseeing",
        activities: ["Breakfast at hotel", "Visit local attraction", "Lunch", "Evening stroll", "Dinner"],
      })),
      tips: [
        "Best time to travel is between October and March.",
        "Book train tickets well in advance.",
        "Carry cash for local markets.",
      ]
    };

    res.json(plan);
  });

  app.post("/api/save-trip", (req, res) => {
    // Mock save
    res.json({ success: true, message: "Trip saved successfully!" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
