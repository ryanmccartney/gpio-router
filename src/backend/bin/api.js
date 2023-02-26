const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const favicon = require("serve-favicon");
const helmet = require("helmet");
const httpLogger = require("@utils/http-logger");

// get environment
const nodeEnv = process.env.NODE_ENV || "production";

// load routes
const documentation = require("@utils/documentation");
const systemRouter = require("@routes/system");

const api = express();

api.locals.moment = require("moment");

api.set("json spaces", 2);
api.use(httpLogger);
api.use(cors());
api.use(
    helmet.contentSecurityPolicy({
        reportOnly: true,
        directives: {
            upgradeInsecureRequests: null,
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "https:", "http:", "'unsafe-inline'"],
            defaultSrc: ["'self'"],
            "base-uri": ["'self'"],
            "block-all-mixed-content": [],
            "font-src": ["'self'", "https:", "http:", "data:"],
            "frame-ancestors": ["'self'"],
            "img-src": ["'self'", "data:", "https:"],
            "object-src": ["'none'"],
        },
    })
);

api.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")));
api.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./data/upload",
    })
);

api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(cookieParser());

api.use("/documentation", documentation);
api.use("/api/system", systemRouter);

// Redirect /api to /documentation
api.use("/api", function (req, res, next) {
    res.redirect("/documentation");
});

// development: serve files in the public folder
api.use(express.static(path.join(__dirname, "..", "public")));

// catch 404 and forward to error handler
api.use(function (req, res, next) {
    const err = new Error("File Not Found");
    err.status = 404;
    next(err);
});

// error handler
api.use(function (error, req, res, next) {
    res.status(error.status || 500).json({
        status: error.status,
        message: error.message,
        stack: nodeEnv !== "production" ? error?.stack?.split("\n") : undefined,
    });
});

module.exports = api;
