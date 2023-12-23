const mongoose  = require("mongoose")

const { Schema  } = mongoose

const ProductSchema = new Schema({
    productName:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    selling_price:{
        type:String,
        required:true
    },
    crossed_price:{
        type:String,
        required:true
    },
    cost_per_item:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    product_sku:{
        type:String
    },
    status:[{
        type:String,
        required:true
    }],
    images:[String],
    categories:[String],
    colors:[String],
    sizes:[String],
    status:[String],
    created_at:Date,
}) 

const Product = mongoose.model("Product",ProductSchema)

module.exports = { Product }