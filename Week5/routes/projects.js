const express = require("express");
const router = express.Router();
const Projects = require("../controllers/projectsController");

// GET /api/projects
router.get("/", Projects.list);

module.exports = router;
