"use strict";

const router = require("express").Router();
const hashResponse = require("@utils/hash-response");

/**
 * @swagger
 * /system/hello:
 *    get:
 *      description: Test route, ChatGPT greets you in response.
 *      tags: [system]
 *      produces:
 *        - application/json
 *      responses:
 *        '200':
 *          description: Success
 */
router.get("/hello", (req, res, next) => {
    const message = { data: "Good morning sunshine, the earth says hello." };
    hashResponse(res, req, message);
});

module.exports = router;
