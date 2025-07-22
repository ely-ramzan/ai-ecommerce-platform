const express = require("express");
const productRouter = express.Router();

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productControllers");

const {isAdmin} = require("../middlewares/authMiddlewares");

productRouter.get("/",getAllProducts);
productRouter.get("/:id",getProductById);

// admin protected:
productRouter.post("/",isAdmin,createProduct);
productRouter.put("/:id",isAdmin,updateProduct);
productRouter.delete("/:id",isAdmin,deleteProduct);

module.exports = productRouter;