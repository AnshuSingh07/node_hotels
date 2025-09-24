const express = require("express");
const router = express.Router();
const Person = require("../models/person");

//POST route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person data

    //create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // save the new person to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:worType", async (req, res) => {
  try {
    const workType = req.params.worType;
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    //extract the person's id from the url parameter
    const personId = req.params.id;

    const updatedPerson = req.body; //updated data for the person

    //assuming you have a Person model
    const response = await Person.findByIdAndUpdate(personId, updatedPerson, {
      new: true, // return the updated document
      runValidators: true, // run mongoose validation (here Person model validation)
    });
    if (!response) {
      console.log(response, "404");
      res.status(404).json({ error: "Person Not Found" });
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
    //extract the person's id from the url parameter
    const personId = req.params.id;

    //assuming you have a Person model
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      res.status(404).json({ error: "Person Not Found" });
    }
    console.log("data deleted");
    res.status(200).json({ message: "Person Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
