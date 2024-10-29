import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const port = 5000;
const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://shubham-singh-0.github.io/MY-MSG-APP/",
        methods: ["GET", "POST"],
        credentials: true
    },
      
});

   app.get("/", (req, res) => {
    res.send("Hello World!");
});



// Queue to hold users waiting for a chat partner
let waitingQueue = [];


    
    io.on("connection", (socket) => {
        socket.on("joinQueue", () => {
            if (waitingQueue.length > 0) {
                const partnerId = waitingQueue.shift();
                const roomId = `${socket.id}-${partnerId}`;
    
                if (io.sockets.sockets.get(partnerId)) {
                    socket.join(roomId);
                    io.sockets.sockets.get(partnerId).join(roomId);
    
                    socket.emit("paired", { roomId });
                    io.to(partnerId).emit("paired", { roomId });
                } else {
                    socket.emit("error", { message: "Partner not found." });
                }
            } else {
                waitingQueue.push(socket.id);
            }
        });

    // Handle incoming chat messages
    socket.on("message", (data) => {
        const { text, message, roomId } = data; // 
        const messageText = text || message;
      
        if (messageText && roomId) {
            io.to(roomId).emit("message", { text: messageText, senderId: socket.id });
        }
    });

   

    socket.on("disconnect", () => {
        // Remove the user from the waiting queue if they are in it
        waitingQueue = waitingQueue.filter(id => id !== socket.id);
        
        // If the user was in the queue, notify others
        if (waitingQueue.length > 0) {
            // Notify the next user in the queue that their partner has left
            const nextUser = waitingQueue[0];
            io.to(nextUser).emit("partnerLeft");
        }
    });


   
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
