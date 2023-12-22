const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema({
    center: {
        type: String,
        required: true,
    },
    foodItems: [
        {
            name: String,
            description: String,
            price: Number,
        }
    ],
});

const Shop = mongoose.model("Shop", shopSchema);
module.exports = Shop;