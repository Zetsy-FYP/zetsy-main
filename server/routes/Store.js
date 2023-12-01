const Store = require("../models/Store");
const User = require("../models/User");

const StoreRouter = require("express").Router();

StoreRouter.get("/:id", async (req, res) => {
  try {
    const store = await Store.findOne({ _id: req.params.id });
    res.status(201).send(store);
  } catch (error) {
    res.status(400).send(error);
  }
});

StoreRouter.post("/", async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();
    res.status(201).send(store);
  } catch (error) {
    res.status(400).send(error);
  }
});

StoreRouter.get("/", async (req, res) => {
  try {
    const store = await Store.find({}).exec();
    res.status(200).send(store);
  } catch (error) {
    res.status(400).send(error);
  }
});

StoreRouter.delete("/:uid", async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete({ _id: req.params.uid })
    if(store){
      await User.updateOne({
        "stores":{ $in : [req.params.uid] }
      }, {$pullAll : {"stores": [req.params.id]}})
       res.json({ message: "Store deleted Successfully" });
    }else{
      res.status(400).json({
        message:"failed to find store"
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     const store = new Store(req.body);
//     await store.save();
//     res.status(201).send(store);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

module.exports = StoreRouter;
