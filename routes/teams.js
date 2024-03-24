/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

const usersController = require("../controllers/teams");
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');




router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);
router.post("/", isAuthenticated, validation.saveTeam, usersController.createTeam);
router.put("/:id", isAuthenticated, validation.saveTeam, usersController.updateTeam);
router.delete("/:id", isAuthenticated, usersController.deleteTeam);


module.exports = router;