const { Server } = require("socket.io");
const logger = require("@utils/logger")(module);
const gpioHandler = require("@sockets/gpio");

const options = {
    cors: {
        origin: "*",
    },
    httpCompression: false,
    serveClient: false,
};

const io = (server) => {
    const io = new Server(server, options);

    io.on("connection", (socket) => {
        gpioHandler(socket);
    });

    return io;
};

module.exports = io;
