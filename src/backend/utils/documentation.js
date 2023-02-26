const express = require("express");
const documentation = express.Router();

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const host = process.env.HOST || "localhost";
const port = process.env.BACKEND_PORT || "80";
const url = `http://${host}:${port}/api/`;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "GPIO Router API",
            version: "0.1.0",
            description: "GPIO over IP central router service API",
            license: {
                name: "GPLv3",
                url: "https://www.gnu.org/licenses/gpl-3.0.en.html",
            },
            contact: {
                name: "Ryan McCartney",
                url: "https://ryan.mccartney.info/",
                email: "ryan@mccartney.info",
            },
        },
        servers: [
            {
                url: url,
            },
        ],
    },
    apis: ["./routes/*.js", "./modules/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
documentation.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = documentation;
