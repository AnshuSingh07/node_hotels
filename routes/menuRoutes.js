const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menu");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (taste === "sweet" || taste === "sour" || taste === "spicy") {
      const response = await MenuItem.find({ taste: taste });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid taste parameter" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    //extract the MenuItem's id from the url parameter
    const menuItemId = req.params.id;

    const updatedMenuItem = req.body; //updated data for the MenuItem

    //assuming you have a MenuItem model
    const response = await MenuItem.findByIdAndUpdate(
      menuItemId,
      updatedMenuItem,
      {
        new: true, // return the updated document
        runValidators: true, // run mongoose validation (here MenuItem model validation)
      }
    );
    if (!response) {
      res.status(404).json({ error: "Menu Item Not Found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    //extract the MenuItem's id from the url parameter
    const menuItemId = req.params.id;

    //assuming you have a MenuItem model
    const response = await MenuItem.findByIdAndDelete(menuItemId);
    if (!response) {
      res.status(404).json({ error: "Menu Item Not Found" });
    }
    console.log("data deleted==========>", response);
    res.status(200).json({ message: "Menu Item Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
