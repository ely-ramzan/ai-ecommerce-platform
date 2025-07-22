const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToMongodb = require("./utils/connectoion");
const {authMiddleware} = require("./middlewares/authMiddlewares");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRouter");


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth/",authRouter);
app.use("/api/products/",authMiddleware,productRouter);
app.use("/api/users/",authMiddleware,userRouter);


const port = process.env.PORT || 3000;
const url = process.env.MONGO_URI;
(async () => {
    try {
        await connectToMongodb(url);
        console.log("Mongo db has been connected");

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch(err){
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    }
})();
