const global = require("@utils/globalEmitter");
const logger = require("@utils/logger")(module);

const gpioHandler = (socket) => {
    logger.info(`SocketIO: Connected ID ${socket.id}`);

    //Function to request the GPIO state
    socket.on("state", async (data) => {
        socket.broadcast.emit("state", { status: settings ? "success" : "failure", data: {} });
    });

    socket.on("disconnect", () => {
        logger.info(`SocketIO: Disconnected ID ${socket.id}`);
    });

    socket.on("reconnect", () => {
        logger.info(`SocketIO: Reconnected ID ${socket.id}`);
    });
};

module.exports = gpioHandler;
