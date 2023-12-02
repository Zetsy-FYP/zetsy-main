const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const { asyncHandler } = require("../utils/Asynchandler");
const Store = require("../models/Store");

const UserRouter = require("express").Router();

UserRouter.get(
  "/store/:id",
  asyncHandler(async (req, res) => {
    const store = await Store.findOne({_id: req.params.id})
    
    const {users} = store;

    var completeUserData = [];
    
    for (let i = 0; i < users.length; i++) {
      const user = await User.findOne({ userUid: users[i].user });
      if (!user) continue;
      completeUserData.push(user);
    }

    res.status(200).json(completeUserData);
  })
);

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

UserRouter.patch("/:uid", async (req, res) => {
  try {
    const user = await User.findOne({
      userUid: req.params.uid,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userFound = await User.findOneAndUpdate(
      { userUid: req.params.uid },
      {
        $set: {
          stores: [...user.stores, req.body.store],
        },
      }
    );

    if (!userFound) {
      throw new Error("failed to find user and update");
    }
    res.status(200).json(userFound);
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

UserRouter.get("/", async (req, res) => {
  try {
    const Users = await User.find({}).populate("stores").exec();
    res.status(200).send(Users);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = UserRouter;
