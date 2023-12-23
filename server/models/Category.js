const mongoose = require("mongoose")

const { Schema } = mongoose

const CategorySchema = new Schema({
    categoryName :{
        required:true,
        type:String
    },
    featuredImage:{
        requird:true,
        type:String
    }
})

module.exports = mongoose.model("Category",CategorySchema)