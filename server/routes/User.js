const User = require("../models/User");

const UserRouter = require("express").Router();

UserRouter.get("/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ userUid: req.params.uid });
    res.json(user).status(200);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

UserRouter.post("/", async (req, res) => {
  const user = new User({
    userUid: req.body.userUid,
    email: req.body.email,
    stores: [],
  });

  try {
    const savedUser = await user.save();
    res.json(savedUser).status(200);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

UserRouter.put("/:uid", async (req, res) => {
  try {
    const user = await User.findOne({
      userUid: req.params.uid,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.store) {
      user.stores = [...user.stores, req.body.store];
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

UserRouter.delete("/:uid", async (req, res) => {
  try {
    await User.findOneAndDelete({ userUid: req.params.uid });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = UserRouter;
