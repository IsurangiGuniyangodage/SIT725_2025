// routes/projects.js
const express = require("express");
const router = express.Router();
const Projects = require("../controllers/projectsController");

// list
router.get("/", Projects.list);

// create
router.post("/", Projects.create);

// get by id
router.get("/:id", Projects.getOne);

module.exports = router;
