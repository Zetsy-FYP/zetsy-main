const Category = require("../models/Category")
const { upload,imagekit } = require("../utils/Imagekit")

const CategoryRouter = require("express").Router()

CategoryRouter.post("/",upload.single("featuredImage"),async (req,res) => {
    try {
        const {categoryName} = req.body

        // const uploadedFile = imagekit.upload({
        //     file:req.file.buffer,
        //     fileName:req.file.filename
        // })

        const category = new Category({
            categoryName,
            featuredImage: process.env.NODE_URL + req.file.path
        })
        await category.save()
        res.send(category)
    }catch(error){
        res.sendStatus(400)
    }
})

CategoryRouter.get("/",async (req,res) => {
    try {
        const category = await Category.find({}).exec()
        res.status(200).send(category)
    }catch(e){
        res.sendStatus(400)
    }
})

module.exports = CategoryRouter