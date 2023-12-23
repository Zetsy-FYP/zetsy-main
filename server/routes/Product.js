const { Product } = require("../models/Product");
const { upload } = require("../utils/Imagekit");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const ProductRouter = require("express").Router();

ProductRouter.post("/", upload.array("images"), async (req, res) => {
  try {
    // description is send as html element from react-rte from which we will extract the content using jsdom
    const dom = new JSDOM(req.body.description);
    const description = dom.window.document.querySelector("p").textContent;
    const {
      productName,
      selling_price,
      crossed_price,
      cost_per_item,
      quantity,
      product_sku,
      categories,
      status,
    } = req.body;
    const filePaths = req.files.map(
      (file) => process.env.NODE_URL + file?.path
    );
    const product = new Product({
      cost_per_item: cost_per_item,
      crossed_price: crossed_price,
      productName: productName,
      description: description,
      selling_price: selling_price,
      product_sku: product_sku,
      categories: categories,
      status: status,
      quantity: quantity,
      images: filePaths,
      created_at:new Date()
    });
    await product.save();
    res.status(200).send(product);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

ProductRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find({}).exec();
    res.status(200).send(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = ProductRouter;
