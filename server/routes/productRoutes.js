const express = require("express");
const productRouter = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productControllers");

const {authMiddleware,isAdmin} = require("../middlewares/authMiddlewares");

productRouter.get("/",getAllProducts);
productRouter.get("/:id",getProductById);

// admin protected:
productRouter.post("/",authMiddleware,isAdmin,createProduct);
productRouter.put("/:id",authMiddleware,isAdmin,updateProduct);
productRouter.delete("/:id",authMiddleware,isAdmin,deleteProduct);

module.exports = productRouter;