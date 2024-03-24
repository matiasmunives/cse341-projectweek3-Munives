/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

const usersController = require("../controllers/teams");
const validation = require('../middleware/validate');

const { isAuthenticated } = require('../middleware/authenticate');


router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);
router.post("/", validation.saveTeam, usersController.createTeam);
router.put("/:id", validation.saveTeam, usersController.updateTeam);
router.delete("/:id", usersController.deleteTeam);


module.exports = router;