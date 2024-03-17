/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();

const usersController = require("../controllers/players");

router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);
router.post("/", usersController.createPlayer);
router.put("/:id", usersController.updatePlayer);
router.delete("/:id", usersController.deletePLayer);


module.exports = router;

