const express = require("express");
const http = require("http");
const { Server } = require("socket.io"); // Use Server from socket.io
const cors = require("cors");
const mongoose = require("./config/db"); // Update to use mongoose
const authRoutes = require("./routes/authRoutes");
const skillRoutes = require("./routes/skillRoutes");
const listingRoutes = require("./routes/listingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const messageRoutes = require("./routes/messageRoutes");

// Initialize the Express app
const app = express();
const server = http.createServer(app);

// Set up Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json()); // Middleware to parse JSON requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);

// Socket.IO for Real-Time Messaging
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle a new message event
  socket.on("sendMessage", (data) => {
    console.log("New message received:", data);

    // Broadcast the message to other connected clients
    io.emit("receiveMessage", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { // Connect to MongoDB
      useUnifiedTopology: true,
    });
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
  }
};

startServer();
