require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let details = [
  {
    id: uuid(),
    firstname: "Taiwo",
    lastname: "Ayeola",
    course: "Pharmacy",
  },
];

//Shows all the names
app.get("/", (req, res) => {
  res.render("index", { details });
});

//Form for collecting data
app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/detail", (req, res) => {
  const { firstname, lastname, course } = req.body;
  details.push({ firstname, lastname, course, id: uuid() });
  res.redirect("/");
});

app.get("/show/:id", (req, res) => {
  const { id } = req.params;
  const detail = details.find((d) => d.id === id);
  res.render("show", { detail });
});

app.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  detail = details.find((d) => d.id === id);
  res.render("edit", { detail });
});

app.patch("/edited/:id", (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, course } = req.body;
  const foundDetails = details.find((d) => d.id === id);
  foundDetails.firstname = firstname;
  foundDetails.lastname = lastname;
  foundDetails.course = course;
  res.redirect(`/show/${id}`);
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  details = details.filter((d) => d.id !== id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
