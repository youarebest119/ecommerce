const express = require("express");
const { authentication } = require("../middlewares/auth");
const { createProduct, getAllProducts, getCategories, getSingleProduct, deleteProduct, updateProduct } = require("../controllers/products");

const router = express.Router();

router.route("/create").post(authentication, createProduct);
router.route("/").get(getAllProducts);
router.route("/categories").get(getCategories);
router.route("/:id").get(getSingleProduct).delete(deleteProduct).put(updateProduct);
router.route("/reviews/:id").get()

module.exports = router;