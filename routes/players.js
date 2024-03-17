/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

const usersController = require("../controllers/players");
const validation = require('../middleware/validate');

router.get("/", usersController.getAll);

router.get("/:id", usersController.getSingle);

router.post("/", validation.savePlayer, usersController.createPlayer);

router.put("/:id", validation.savePlayer, usersController.updatePlayer);

router.delete("/:id", usersController.deletePlayer);


module.exports = router;

