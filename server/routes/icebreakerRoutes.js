const express = require("express");
const Icebreaker = require("../models/icebreakerModel.js");
const User = require("../models/userModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let query = {};
    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }
    const icebreakers = await Icebreaker.find({});

    return res.status(200).json({
      count: icebreakers.length,
      data: icebreakers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/", (req, res, next) => {
  const filters = req.query;
  const filteredIcebreakers = Icebreaker.filter((icebreaker) => {
    let isValid = true;
    for (key in filters) {
      console.log(key, icebreaker[key], filters[key]);
      isValid = isValid && icebreaker[key] == filters[key];
    }
    return isValid;
  });
  res.status(201).send(filteredIcebreakers);
});

router.delete("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const result = await Icebreaker.deleteOne({ name: name });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Icebreaker not found" });
    }

    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// router.get('/search/:name', function(req, res) {
//   var searchQuery = req.query.name;
//   if (!searchQuery) {
//     return res.status(400).json({message: "No search query provided"})
//   }

//   const icebreakers = await

// });

// router.get('/search/:category', function(req, res, next) {
//   var category = req.params.category;
//   Icebreaker.find({category: category}, function (err, icebreakers) {
//       if(err) {
//           return res.render('/search', {icebreakers: null});
//       }
//       res.render('/search', {icebreakers: icebreakers});
//   });
// });

// router.delete("/", (req, res) => {

//     const icebreakerIndex = getIcebreakerIndex(req.params.icebreaker.name);

//     if (icebreakerIndex === -1) return res.status(404).json({})

//     Icebreaker.splice(icebreakerIndex, 1)
//     res.json(Icebreaker)
// })

// router.get('/delete/:name', async (req, res) => {
//   try {
//       const icebreakerIndex = await Icebreaker.getIcebreakerIndex(req.params.icebreaker.name)
//       await Topic.remove({ _id: req.params.id })
//       res.redirect('/dashboard')
//   } catch (error) {
//      console.log(error)
//   }
// })

router.post("/create", async (req, res) => {
  try {
    const { name, description, author, category, feedback, rating } = req.body;

    const authorUser = await User.findOne({ username: author });

    if (!authorUser) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newIcebreaker = {
      name,
      description,
      author: authorUser,
      category,
      feedback,
      rating,
    };

    const icebreaker = await Icebreaker.create(newIcebreaker);

    return res.status(201).send(icebreaker);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
