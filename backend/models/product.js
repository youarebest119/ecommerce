const moment = require("moment");
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    tags: {
        type: [String],
        validate: v => Array.isArray(v) && v.length > 0,
    },
    isInStock: {
        type: Boolean,
        required: true,
        default: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
    },
    availableSizes: {
        // type: [Number || String],
        // required: true,
        // validate: v => Array.isArray(v) && v.length > 0,
    },
    // TODO: Update on adding review to product
    rating: {
        type: Number,
        required: true,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            rating: {
                type: Number,
            },
            date: {
                type: String,
                default: moment(new Date()).format("MMM DD, YYYY"),
            },
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
    price: {
        type: Number,
        required: true,
    },
    brandName: {
        type: String,
        required: true,
    },
    productImage: {
        url: {
            type: String,
            required: true,
        },
    },
    additionalImages: [
        {
            url: {
                type: String,
                required: true,
            },
        },
    ],
}, {
    timestamps: true,
})

module.exports = mongoose.model("Products", productSchema);