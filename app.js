const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Import the cors package
const sequelize = require("./config/db"); // Import the sequelize instance
const authRoutes = require("./routes/authRoutes");
const skillRoutes = require("./routes/skillRoutes");
const listingRoutes = require("./routes/listingRoutes");
const reviewRoutes = require("./routes/reviewRoutes"); // Import review routes
const messageRoutes = require("./routes/messageRoutes"); // Import message routes
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Enable CORS for localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Allow credentials (if needed)
  })
);

app.use(express.json()); // Middleware to parse JSON requests

// Use the authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/reviews", reviewRoutes); // Add reviews routes
app.use("/api/messages", messageRoutes);


// Sync the database and start the server
const startServer = async () => {
  try {
    await sequelize.sync(); // Sync models with the database
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
  }
};

startServer();