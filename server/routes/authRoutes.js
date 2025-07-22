const express = require('express');
const { signupController,loginController } = require('../controllers/authControllers');
const { userRegistrationValidator } = require('../middlewares/validationMiddlewares');

const authRouter = express.Router();


// signup
authRouter.post("/register",userRegistrationValidator,signupController);

// login
authRouter.post("/login",loginController);

module.exports = authRouter;
