const express = require("express");
const { generateDescription } = require("../controllers/aiControllers");
const {authMiddleware,isAdmin} = require("./middlewares/authMiddlewares");
const aiRouter = express.Router();

aiRouter.post("/generate-description",authMiddleware,isAdmin,generateDescription);

module.exports = aiRouter;