const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

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

app.get("/api/genres", (req, res) => {
  !genres ? res.status(400).send("No Genres were found") : res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  !genre
    ? res.status(400).send("No Genre was found by that id")
    : res.send(genre);
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
    likes: req.body.likes,
  };
  genres.push(genre);
  res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    console.log(error.message);
  } else {
    genre.name = req.body.name;
    genre.likes = req.body.likes;
    res.send(genre);
  }
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) {
    res.status(400).send("No genre was found by that parameter");
  } else {
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genres);
  }
});

app.listen(port, () => {
  console.log(`Connected on ${port}`);
});
