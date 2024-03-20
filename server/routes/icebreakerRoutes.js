const express = require("express");
const Icebreaker = require("../models/icebreakerModel.js");
const User = require("../models/userModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
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

router.get("/createdIcebreaker/:userId", async (req, res) => {
  console.log("GET /userId");
  try {
    const icebreakers = await Icebreaker.find({ author: req.params.userId });

    return res.status(200).json({
      count: icebreakers.length,
      data: icebreakers,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const {
      name,
      fullDescription,
      shortDescription,
      author,
      category,
      feedback,
      rating,
      visable,
      imageName,
      timesReported,
      defaultTime,
    } = req.body;

    const authorUser = await User.findOne({ username: author });

    const feedbacks = [];
    const ratings = []; //lagt til her

    if (!authorUser) {
      return res.status(404).json({ message: "Author not found" });
    }

    const newIcebreaker = {
      name,
      fullDescription,
      shortDescription,
      author: authorUser,
      category,
      feedback: feedbacks,
      rating,
      ratings: ratings, //lagt til her
      visable,
      imageName,
      timesReported,
      defaultTime,
    };

    const icebreaker = await Icebreaker.create(newIcebreaker);
    await User.findByIdAndUpdate(authorUser._id, {
      $push: { createdIcebreakers: icebreaker._id }, // Use the _id from the created icebreaker document
    });

    return res.status(201).send(icebreaker);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/createdby/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const icebreakers = await Icebreaker.find({ author: userId });

    if (icebreakers.length === 0) {
      return res
        .status(400)
        .json({ message: "No icebreaker found for this user" });
    }

    res.json(icebreakers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

function isAdmin(req, res, next) {
  const userRole = req.headers["x-user-role"];
  if (userRole === "admin") {
    next();
  } else {
    console.log(
      "Access denied. User role:",
      req.user ? req.user.role : "No user"
    );
    res.status(403).send("Access denied");
  }
}

router.get("/reported", isAdmin, async (req, res) => {
  try {
    const reportedIcebreakers = await Icebreaker.find({
      timesReported: { $gt: 0 },
    });
    res.json(reportedIcebreakers);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

router.put("/:id/clear-reports", isAdmin, async (req, res) => {
  try {
    const icebreaker = await Icebreaker.findById(req.params.id);
    if (!icebreaker) {
      return res.status(404).send("Icebreaker not found");
    }
    icebreaker.timesReported = 0;
    await icebreaker.save();
    res.send("Reports cleared from icebreaker");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Icebreaker.findByIdAndDelete(req.params.id);
    res.send("Icebreaker deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/:id/report", async (req, res) => {
  try {
    const icebreaker = await Icebreaker.findById(req.params.id);
    if (!icebreaker) {
      return res.status(404).send("Icebreaker not found");
    }
    icebreaker.timesReported += 1;
    await icebreaker.save();
    res.send("Icebreaker reported");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// router.post("/rating/:name", async (req, res) => {
//   try {
//     const { name } = req.params;

//     let icebreaker = await Icebreaker.findOneAndUpdate(
//       { name },
//       { $push: { ratings: req.body.rating } }
//     );

//     if (!icebreaker) {
//       return res.status(404).json({ message: "Icebreaker not found" });
//     }

//     icebreaker = await Icebreaker.findOne({ name });

//     res.status(200).send(icebreaker);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

module.exports = router;
