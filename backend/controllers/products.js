const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../models/product");
const { LAZY_TIME, PRODUCT_PER_PAGE } = require("../utils/constants");
const ErrorHandler = require("../utils/errorHandlers");
const { sendResponse } = require("../utils/sendResponse");

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let {
        category,
        name,
        description,
        tags,
        gender,
        availableSizes,
        price,
        brandName,
        productImage,
        additionalImages,
    } = req.body;
    let user = req.user;
    if (tags) {
        tags = tags.split(/[ ,]+/);
        if (tags[tags.length - 1] === "") {
            tags.pop();
        }
    } else {
        tags = [];
    };

    let existedProduct = await Product.find({
        name,
        category,
        gender,
        brandName,
    });
    if (existedProduct.length > 0) {
        return next(new ErrorHandler("Already Exists", 409));
    }
    let product = new Product({
        category: category.toLocaleLowerCase().split(" ").join("-"),
        name,
        description,
        tags,
        isInStock: true,
        availableSizes,
        rating: 5,
        price,
        productImage,
        additionalImages,
        brandName,
        gender,
        author: user._id,
    });
    await product.save();
    const newProduct = JSON.parse(JSON.stringify(product));
    delete newProduct.author;
    sendResponse(res, 200, "Product created", { data: newProduct, })
});

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const query = {
        // author: req.body.author,
    }
    const { gender } = req.query;
    if (gender) {
        query.gender = gender;
    }
    const { search } = req.query;
    if (search) {
        query.name = { $regex: new RegExp(search, "i") }
    }
    const { description } = req.query;
    if (description) {
        query.description = { $regex: new RegExp(description, "i") }
    }
    const { category } = req.query;
    if (category) {
        query.category = { $regex: new RegExp(category, "i") }
    }

    let { tags } = req.query;
    if (tags) {
        tags = tags.split(/[ ,]+/);
        if (tags[tags.length - 1] === "") {
            tags.pop();
        }
        query.tags = {
            $all: tags,
        };
    };

    const { isInStock } = req.query;
    if (isInStock) {
        query.isInStock = isInStock;
    }

    const { availableSizes } = req.query;
    if (availableSizes) {
        query.availableSizes = {
            $in: [Number(availableSizes) || availableSizes],
        }
    }

    let { range } = req.query;
    if (range) {
        range = range.split(/[ ,]+/);
        if (range[range.length - 1] === "") {
            range.pop();
        }
        query.price = {
            $gt: range[0],
            $lt: range[1],
        };
    }

    const { page } = req.query;
    const { sort } = req.query;

    const products = await Product.find(query).limit(PRODUCT_PER_PAGE).skip(((page || 1) - 1) * PRODUCT_PER_PAGE).sort({
        updatedAt: sort !== "asc" ? -1 : 1
    });
    const fetched = await Product.find(query);
    const total = await Product.find({
        // author: req.body.author,
    })
    sendResponse(res, 200, "product fetched", {
        total: fetched.length,
        fetched: products.length,
        dataPerPage: PRODUCT_PER_PAGE,
        data: products,
        message: "product fetched",
    })
})

exports.getSingleProduct = catchAsyncErrors(async (req, res) => {
    if (req.params.id === "create") {
        return res.status(404).json({
            message: 'Ohh you are lost, read the API documentation to find your way back home :)',
            success: false,
        })
    }
    const query = {
        _id: req.params.id,
    }
    const product = await Product.findOne(query).select("-reviews");
    sendResponse(res, 200, "Product fetched", { data: product })
})
exports.deleteProduct = catchAsyncErrors(async (req, res) => {
    const query = {
        _id: req.params.id,
    }
    const product = await Product.deleteOne(query)
    res.status(200).json({
        success: true,
        data: product,
        message: "product deleted",
    })
})
exports.updateProduct = catchAsyncErrors(async (req, res) => {
    const query = {
        _id: req.params.id
    }
    const product = await Product.updateOne(query, { ...req.body })
    res.status(200).json({
        success: true,
        data: product,
        message: "product updated",
    })
})

exports.getCategories = catchAsyncErrors(async (req, res) => {
    const product = await Product.aggregate([
        // {
        //     $match: {
        //         author: req.body.author,
        //     }
        // },
        {
            $group: {
                _id: "$category",
            }
        },
        {
            $sort: {
                _id: 1,
            },
        }
    ]);
    sendResponse(res, 200, "product categories fetched", { data: product })
})