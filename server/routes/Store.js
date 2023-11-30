const Store = require("../models/Store");

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
