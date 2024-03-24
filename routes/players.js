/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

const usersController = require("../controllers/players");
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);
router.post("/", isAuthenticated, validation.savePlayer, usersController.createPlayer);
router.put("/:id", isAuthenticated, validation.savePlayer, usersController.updatePlayer);
router.delete("/:id", isAuthenticated, usersController.deletePlayer);


module.exports = router;

