/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

const usersController = require("../controllers/teams");

router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);
router.post("/", usersController.createTeam);
router.put("/:id", usersController.updateTeam);
router.delete("/:id", usersController.deleteTeam);


module.exports = router;