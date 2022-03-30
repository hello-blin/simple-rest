const express = require("express");
const router = express.Router();


const genres = [
    {
      id: 1,
      name: "Crime",
      likes: 2000,
    },
    {
      id: 2,
      name: "Action",
      likes: 10000,
    },
    {
      id: 3,
      name: "Romance",
      likes: 4990,
    },
  ];

router.get("/", (req, res) => {
  !genres ? res.status(400).send("No Genres were found") : res.send(genres);
});

router.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  !genre
    ? res.status(400).send("No Genre was found by that id")
    : res.send(genre);
  res.send(genre);
});

router.post("/", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  console.log(result);

  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
    likes: req.body.likes,
  };
  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) res.status(400).send("No genre was found by that id");

  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  console.log(result);

  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }
  genre.name = req.body.name;
  genre.likes = req.body.likes;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) res.status(400).send("No genre was found by that parameter");
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genres);
});

module.exports = router;
